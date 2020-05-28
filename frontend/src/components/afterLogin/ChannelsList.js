import React from 'react';
import { connect } from 'react-redux';
import {fetchChannels,setCurrentChat} from '../../actions';
import { Link } from 'react-router-dom';


class ChannelsList extends React.Component{
    componentDidMount(){
        this.props.fetchChannels()
    }


    renderChannelsList = () => {
        return(
            <div className="list-group" style={{minWidth:'15vw'}}>
                {this.props.channelsList.map(channel=>{
                    return(
                        <button 
                            type="button" 
                            className="list-group-item list-group-item-action p-1 overflow-auto text-nowrap" key={channel.id}
                            onClick={()=>{
                                localStorage.setItem('currentChat',channel.name)
                                this.props.setCurrentChat(channel.name)
                            }}
                        >
                            {channel.name}
                        </button>
                    )
                }
                )}
            </div>
        )
    }


    render(){
        console.log(localStorage.getItem('token'))
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
    }
}

export default connect(mapStateToProps,{fetchChannels,setCurrentChat})(ChannelsList);