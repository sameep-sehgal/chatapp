import React from 'react';
import { connect } from 'react-redux';
import {fetchChannels} from '../../actions';
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
                        <Link type="button" className="list-group-item list-group-item-action p-1 overflow-auto text-nowrap" key={channel.id}>
                            {channel.name}
                        </Link>
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

export default connect(mapStateToProps,{fetchChannels})(ChannelsList);