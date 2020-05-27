import React from 'react';
import {Router,Route} from 'react-router-dom';


import Chat from './afterLogin/Chat';
import UserLoginSignup from './beforeLogin/UserLoginSignup';
import history from '../history'



const App = () => {
    return(
        <Router history={history}>
            <Route path='/' exact component={Chat}/>
            <Route path='/user' component={UserLoginSignup}/>
        </Router>
    )
}

export default App;