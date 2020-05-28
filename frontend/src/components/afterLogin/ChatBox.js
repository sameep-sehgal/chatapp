import React from 'react';
import { connect } from 'react-redux';
import socket from './socket'


class ChatBox extends React.Component{
    state={message:''}
    componentDidMount(){


        socket.emit('chat-message',message=>{
            console.log(message)
        })
        socket.on('chat-message',message => {
            
            console.log(message)
        })
    }


    onSubmit = (event) => {
        event.preventDefault()
        socket.emit('send-message',this.state.message)
    }


    render(){
        return (
            <div className='container w-100' style={{height:'100%'}}>
                <div className='row justify-content-center bg-dark text-light py-2 mr-0 align-items-start' style={{borderBottom:'solid black 0.6px'}}>
                    {this.props.currentChat}
                </div>
                <div className='row justify-content-center align-items-end w-100'>
                    <form onSubmit={event=>{this.onSubmit(event)}}>
                        <input 
                            type='text' 
                            placeholder='Message' 
                            className='pr-5' 
                            style={{minWidth:'25vw'}} 
                            onChange={(event)=>{this.setState({message:event.target.value})}}
                            maxLength='200'
                        />
                    </form>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) =>{
    return {
        currentChat:state.currentChat
    }
}


export default connect(mapStateToProps)(ChatBox);