import React from 'react';
import { connect } from 'react-redux';
import {fetchUsers,setCurrentChat} from '../../actions';
import { Link } from 'react-router-dom';


class UsersList extends React.Component{
    componentDidMount(){
        this.props.fetchUsers()
    }


    renderUsersList = () => {
        return(
            <div className="list-group" style={{minWidth:'15vw'}}>
                {this.props.usersList.map(user=>{
                    return(
                        <button 
                            type="button" 
                            className="list-group-item list-group-item-action p-1 overflow-auto text-nowrap" key={user.username}
                            onClick={()=>{
                                localStorage.setItem('currentChat',user.username)
                                this.props.setCurrentChat(user.username)
                            }}
                        >
                            {user.username}
                        </button>
                    )
                }
                )}
            </div>
        )
    }


    render(){
        return(
        <React.Fragment>
            {this.renderUsersList()}
        </React.Fragment>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        usersList:state.users
    }
}

export default connect(mapStateToProps,{fetchUsers,setCurrentChat})(UsersList);