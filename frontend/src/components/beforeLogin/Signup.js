import React from 'react';
import renderInputField from './renderInputField';
import {signupFormSubmit} from '../../actions';
import { connect } from 'react-redux';
import djangoBackend from '../../apis/djangoBackend';


class Signup extends React.Component {
    state={
        username:'',
        password:'',
        passwordAgain:'',
        errors:{
            username:'Username must contain atleast 5 characters.',
            password:'Password must be atleast 9 characters.',
            passwordAgain:''
        }
    }
    

    onSubmit = (event)=>{
        event.preventDefault()
        const {errors} = this.state
        
        if(formValidate(errors)){
            this.props.signupFormSubmit(this.state)
        }else{
        changeBgColorIfErrors(event,errors)
        alert('Invalid form details!')
        }
    }


    onChange = (event) => {
        const {name,value} = event.target
        const errors={}


        switch(name){                   //Changing errors object based on user input.
            case 'username':    
                if(value.length>4){
                    const checkUniqueUsername = async ()=>{ //instantly checks whether username is unique 
                        const response = await djangoBackend.post('/api/users/checkUsername',{username:value})
                        
                        if(response.data.unique){
                            errors.username=''
                        }else{
                            errors.username='Username already exists.'
                        }
                        this.setState({errors:{...this.state.errors,...errors}})
                        if(errors[name]){                       //Changing background color of username input based on uniqueness of username
                            document.querySelector('input').style.backgroundColor='white' //cannot use event object here due to promise object
                        }else{
                            document.querySelector('input').style.backgroundColor='#AFFFAF'
                        }
                    }
                    checkUniqueUsername()
                }else{
                    errors.username='Username must contain atleast 5 characters.'
                }
                break
            case 'password':
                if(value.length<9){
                    errors.password='Password must be atleast 9 characters.'
                    break
                }
                errors.password='';
                break
            case 'passwordAgain':
                if(value.length>=8 && (this.state.password===value)){
                    errors.passwordAgain=''
                }else{
                    
                    errors.passwordAgain='Passwords do not match.'
                }
                break
            default:
                break
        }

        this.setState({errors:{...(this.state.errors),...errors},[name]:value})
        if(errors[name]){                       //Changing background color based on errors
            event.target.style.backgroundColor='white'
        }else{
            event.target.style.backgroundColor='#AFFFAF'
        }
    }


    render(){
        return(
            <form onSubmit={this.onSubmit} noValidate className='text-center px-3 py-4'>
                {renderInputField('Username','username','text',this.onChange,this.state.username,this.state.errors.username)}
                {renderInputField('Password','password','password',this.onChange,this.state.password,this.state.errors.password)}
                {renderInputField('Password Again','passwordAgain','password',this.onChange,this.state.passwordAgain,this.state.errors.passwordAgain)}
                <button type="submit" className="btn btn-info m-3 rounded">Sign Up</button>
            </form>
        )
    }
}


//HELPER FUNCTIONS

const formValidate = errors => {
    let valid = true
    Object.values(errors).forEach(val=>{
        if(val.length>0){
            valid=false;
        }
    })
    return valid;
}


const changeBgColorIfErrors = (event,errors)=>{
    const lightRedBg='#FF7575'
        
        if(errors.username){
            event.target.elements[0].style.backgroundColor=lightRedBg
        }
        if(errors.password){
            event.target.elements[1].style.backgroundColor=lightRedBg
        }
        if(errors.passwordAgain){
            event.target.elements[2].style.backgroundColor=lightRedBg
        }
}

const containsNumber = (str) => {
    //Checks whether string contains a number or not
    for(let char of str){
        if(isFinite(char)===true){
            return true
        }
    }
    return false
}

export default connect(null,{signupFormSubmit})(Signup);