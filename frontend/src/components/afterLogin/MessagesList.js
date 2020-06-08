import React,{useEffect} from 'react';
import {animateScroll} from 'react-scroll';
import { connect } from 'react-redux';
import {fetchMessages,fetchNewMessages} from '../../actions'
import Message from './Message';


const MessagesList =(props)=> {

    const scrollToBottom = () =>{
        animateScroll.scrollToBottom({
            containerId:'scroll',
            duration:300
        })
    }

    useEffect(()=>{
        console.log('!props.messge')
        props.fetchNewMessages(props.currentChat.id)
        props.fetchMessages(props.currentChat.id)
        // {scrollToBottom()}
        
    },[props.currentChat.id])

    
    const renderUsername= (username) => {
        if(props.user.username===username){
            return 'You'
        }
        else{
            return username
        }
    }


    const renderClassName = (username) => {
        if(props.user.username===username){
            return 'justify-content-end mr-2'
        }else{
            return 'justify-content-start'
        }
    }


    const renderMessages = () => {
        // {scrollToBottom()}
        return props.messages.map(message=>{
            return (
                <Message 
                    className={renderClassName(message.sender)} 
                    sender={renderUsername(message.sender)}
                    time={message.time}
                    text={message.text}
                />
            )
        })
    } 


    // const renderNewMessages = () => {
    //     return props.newMessages.map(message=>{
    //         return(
    //             <Message
    //                 className={renderClassName(message.sender)} 
    //                 sender={renderUsername(message.sender)}
    //                 time={message.time}
    //                 text={message.text}
    //             />
    //         )
    //     })
    // }

    
    return (
        <div>
            {/* {scrollToBottom()} */}
            <div onMouseEnter={scrollToBottom} className='h-100 pl-4' id='scroll' style={{minHeight:'25vh',maxHeight:'60vh',overflowY:'auto',overflowX:'hidden'}}>
                {renderMessages()}
            </div>
            
        </div>
    )
}

const componentDidMount=(state)=>{
    return {
        currentChat:state.currentChat,
        messages:state.messages,
        user:state.user,
        newMessages:state.newMessages,
    }
}

export default connect(componentDidMount,{fetchMessages,fetchNewMessages})(MessagesList);