import React from 'react';
import renderInputField from './renderInputField';
import {signupFormSubmit} from '../../actions';
import { connect } from 'react-redux';


class Signup extends React.Component {
    state={
        username:'',
        password:'',
        passwordAgain:'',
        errors:{
            username:'Username must contain atleast 5 characters.',
            password:'Password must be atleast 8 characters(include numbers).',
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
        console.log(event.target)

        switch(name){                   //Changing errors object based on user input.
            case 'username':    
                errors.username=value.length>4?'':'Username must contain atleast 5 characters.'
                break
            case 'password':
                if(value.length<8){
                    errors.password='Password must be atleast 8 characters(include numbers).'
                    break
                }
                if(value.length>=8){
                    errors.password= containsNumber(value)?'':'Password must include atleast 1 numerical value(0-9)'
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
        console.log(this.state)
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