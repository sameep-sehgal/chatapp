import React from 'react';
import {BrowserRouter,Route, Switch, Link} from 'react-router-dom';

import Signup from './forms/Signup';
import Login from './forms/Login';

const App = () => {
    return(
        <BrowserRouter className='bg-dark'>
            <div className='d-flex justify-content-around mt-2'>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Signup</Link>
            </div>
            <Route path='/signup' exact component={Signup}/>
            <Route path='/login' exact component={Login}/>
        </BrowserRouter>
    )
}

export default App;