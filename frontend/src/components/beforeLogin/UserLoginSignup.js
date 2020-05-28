import React from 'react';
import {Route,Link} from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import history from '../../history'


class UserLoginSignup extends React.Component{

    constructor(){
        super()
        const token=localStorage.getItem('token')
        if(token){
            history.push('/')
        }
    }

    render(){
        console.log(localStorage.getItem('token'))
        return(
            <React.Fragment>
                <div 
                    className='d-flex justify-content-around p-3' 
                    style={{minWidth:'48vw',borderBottom:'solid black 1px'}}
                >
                    <Link to='/user/login'>Login</Link>
                    <Link to='/user/signup'>Signup</Link>
                </div>
                <Route path='/user/signup' exact component={Signup}/>
                <Route path='/user/login' exact component={Login}/>
            </React.Fragment>
        )
    }
}

export default UserLoginSignup;