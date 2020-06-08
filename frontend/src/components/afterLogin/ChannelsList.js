import React from 'react';
import { connect } from 'react-redux';
import {fetchChannels,setCurrentChat,deleteChannel} from '../../actions';
import socket from './socket';


class ChannelsList extends React.Component{
    componentDidMount(){
        this.props.fetchChannels()
    }


    renderDeleteButton = (createdById,channelId) => {
        if(createdById===this.props.userId){
            return(
                <button 
                    className='btn btn-danger p-0'
                    onClick={() => this.props.deleteChannel(channelId)}
                >
                    Delete
                </button>
            )
        }
    }


    renderChannelsList = () => {
        return(
            <div className="list-group" style={{minWidth:'15vw'}}>
                {this.props.channelsList.map(channel=>{
                    return(
                        <div 
                            type="button" 
                            className="list-group-item list-group-item-action p-1 overflow-auto text-nowrap d-flex justify-content-between" key={channel.id}
                            onClick={()=>{
                                socket.emit('join-room',channel.id)
                                localStorage.setItem('isChannel',true)
                                localStorage.setItem('currentChat',channel.name)
                                localStorage.setItem('chatId',channel.id)
                                this.props.setCurrentChat({id:channel.id,name:channel.name,isChannel:true})
                            }}
                        >
                            {channel.name}
                            {this.renderDeleteButton(channel.created_by,channel.id)}
                        </div>
                    )
                }
                )}
            </div>
        )
    }


    render(){
        return(
            <React.Fragment>
                {this.renderChannelsList()}
            </React.Fragment>
            
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        channelsList:state.channels,
        userId:state.user.id
    }
}

export default connect(mapStateToProps,{fetchChannels,setCurrentChat,deleteChannel})(ChannelsList);