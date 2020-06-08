import React from 'react';
import { connect } from 'react-redux';


import socket from './socket';
import time from './time'

import MessagesList from './MessagesList';
import {addNewMessage,addNewMessageToReducerOnly,saveMessage} from '../../actions';


class ChatBox extends React.Component{
    state={message:''}
    componentDidMount(){
        socket.emit('join-room',this.props.currentChat.id)
        socket.on('message',message => {
            if(message.channelId===this.props.currentChat.id){
                this.props.addNewMessage(message)
            }
        })
    }


    


    // componentDidUpdate(prevProps){
    //     console.log(prevProps)
    //     if(prevProps.currentChat.id!==this.props.currentChat.id){
    //         socket.on('message',message => {
    //             console.log(message)
    //             // if(message.id!==this.state.messageId){
    //                 this.props.addNewMessage(message)
    //             // }
    //             // this.setState({messageId:message.id})
    //         })
    //     }
    // }


    onSubmit = (event) => {
        event.preventDefault()
        const message = {}
        message.text=this.state.message
        message.sender=this.props.user.username
        message.time=time
        message.channelId=this.props.currentChat.id
        socket.emit('message',message)
        this.props.addNewMessage(message)
        this.setState({message:''})
        this.props.saveMessage(message)
    }


    render(){
        return (
            <div className='container w-100' style={{height:'100%'}}>
                <div className='row justify-content-center bg-dark text-light py-2 mr-0 align-items-start' style={{borderBottom:'solid black 0.6px'}}>
                    {this.props.currentChat.name}
                </div>
                <div className='row justify-content-center align-items-end w-100 my-2'>
                    <form onSubmit={event=>{this.onSubmit(event)}}>
                        <input 
                            type='text' 
                            placeholder='Message' 
                            className='pr-5' 
                            value={this.state.message}
                            style={{minWidth:'25vw'}} 
                            onChange={(event)=>{this.setState({message:event.target.value})}}
                            maxLength='200'
                            required
                        />
                    </form>
                </div>
                <div className='row'>
                    <div className='container mr-3' style={{borderTop:'solid black 5px'}}>
                        <MessagesList/>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) =>{
    return {
        currentChat:state.currentChat,
        user:state.user
    }
}


export default connect(mapStateToProps,{addNewMessage,addNewMessageToReducerOnly,saveMessage})(ChatBox);