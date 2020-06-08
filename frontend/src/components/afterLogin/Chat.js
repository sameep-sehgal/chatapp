import React from 'react';
import { connect } from 'react-redux';

import {fetchUser} from '../../actions';
import ChannelsList from './ChannelsList';
import UsersList from './UsersList';
import Header from './Header';
import history from '../../history'
import ChatBox from './ChatBox';


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


    renderChatBox = () => {
        if(this.props.currentChat.name){
            return <ChatBox/>
        }else{
            return <h4>Select a Chat.</h4>
        }
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
                    <div className="col-4 pb-3 pr-0 pl-1 mb-0" style={{minWidth:'25vw',borderRight:'solid black 1px'}}>
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
                        {this.renderChatBox()}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps=(state)=>{
    return{
        currentChat:state.currentChat
    }
}

export default connect(mapStateToProps,{fetchUser})(Chat);