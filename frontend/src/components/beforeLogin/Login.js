import React from 'react';
import renderInputField from './renderInputField';
import {loginFormSubmit} from '../../actions';
import { connect } from 'react-redux';


class Login extends React.Component {
    state={
        username:'',
        password:'',
    }
    

    onSubmit = (event)=>{
        event.preventDefault()
        this.props.loginFormSubmit(this.state)
    }


    onChange = (event) => {
        const {name,value} = event.target
        this.setState({[name]:value})
    }


    render(){
        return(
            <form onSubmit={this.onSubmit} className='text-center p-4'>
                {renderInputField('Username','username','text',this.onChange,this.state.username,null,'5')}
                {renderInputField('Password','password','password',this.onChange,this.state.password,null,'8')}
                <button type="submit" className="btn btn-info m-3 rounded">Login</button>
            </form>
        )
    }
}


export default connect(null,{loginFormSubmit})(Login);