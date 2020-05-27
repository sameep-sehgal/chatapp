import React from 'react';
import { connect } from 'react-redux';

import {fetchUser} from '../../actions';
import ChannelsList from './ChannelsList';
import UsersList from './UsersList';
import Header from './Header';
import history from '../../history'


class Chat extends React.Component{
    constructor(){
        super()
        const token=localStorage.getItem('token')
        if(!token){
            history.push('./user')
        }
    }
    componentDidMount(){
        this.props.fetchUser()
    }

    render(){
        console.log(localStorage.getItem('token'))
        return(
            <React.Fragment>
                <div className='row' style={{minWidth:'75vw'}}>
                    <div className='col-12 text-center'>
                        <Header/>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-4 pb-3" style={{minWidth:'25vw',borderRight:'solid black 1px'}}>
                        <div className='container'>
                            <div className='row justify-content-center '>
                                <div className='col-12'>
                                    <h5 className='text-center'>Users</h5>
                                </div>
                                <div className='col-12 overflow-auto' style={{maxHeight:'32vh'}}>
                                    <UsersList/>
                                </div>
                            </div>
                            <div className='row justify-content-center overflow-auto'>
                                <div className='col-12'>
                                    <h5 className='text-center'>Channels</h5>
                                </div>
                                <div className='col-12 overflow-auto' style={{maxHeight:'32vh'}}>
                                    <ChannelsList/>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-8">
                        <div className='row justify-content-center'>
                            <h1>Messages</h1>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps=(state)=>{
    return{

    }
}

export default connect(mapStateToProps,{fetchUser})(Chat);