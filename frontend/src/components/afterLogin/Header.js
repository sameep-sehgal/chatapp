import React from 'react';
import { connect } from 'react-redux';
import {changeUsername,changePassword,createChannel} from '../../actions';
import renderInputField from '../beforeLogin/renderInputField';
import djangoBackend from '../../apis/djangoBackend';
import history from '../../history';

class Header extends React.Component{
    state={
        showContent:false,
        changeUsername:false,
        changePassword:false,
        newChannel:false,
        newUsername:'',
        newPassword:'',
        channelName:'',
        error:''
    }


    onUsernameChange = (event) => {
        const {value} = event.target
        let error=''
        if(value.length>4){ //Validating username
            const checkUniqueUsername = async ()=>{ //instantly checks whether username is unique 
                const response = await djangoBackend.post('/api/users/checkUsername',{username:value},{
                    headers:{
                        Authorization:`Token ${localStorage.getItem('token')}`
                    }
                })
                
                if(response.data.unique){
                    error=''
                }else{
                    error='Username already exists.'
                }
                this.setState({error})
                if(error){                       //Changing background color of username input based on uniqueness of username
                    document.querySelector('input').style.backgroundColor='white' //cannot use event object here due to promise object
                }else{
                    document.querySelector('input').style.backgroundColor='#AFFFAF'
                }
            }
            checkUniqueUsername()
        }

        this.setState({newUsername:event.target.value,error})
        if(error || value.length<5){                       //Changing background color based on errors
            event.target.style.backgroundColor='white'
        }else{
            event.target.style.backgroundColor='#AFFFAF'
        }
    }


    onPasswordChange = (event) => {
        this.setState({newPassword:event.target.value})
    }


    onChannelChange = (event) => {
        const {value} = event.target
        let error=''
        if(value.length>4){ //Validating username
            const checkUniqueChannel = async ()=>{ //instantly checks whether Channel name is unique 
                const response = await djangoBackend.post('/api/checkChannel/',{channelName:value},{
                    headers:{
                        Authorization:`Token ${localStorage.getItem('token')}`
                    }
                })
                
                if(response.data.unique){
                    error=''
                }else{
                    error='Channel already exists.'
                }
                this.setState({error})
                if(error){                       //Changing background color of username input based on uniqueness of username
                    document.querySelector('input').style.backgroundColor='white' //cannot use event object here due to promise object
                }else{
                    document.querySelector('input').style.backgroundColor='#AFFFAF'
                }
            }
            checkUniqueChannel()
        }

        this.setState({channelName:event.target.value,error})
        if(error || value.length<5){                       //Changing background color based on errors
            event.target.style.backgroundColor='white'
        }else{
            event.target.style.backgroundColor='#AFFFAF'
        }
    }


    onHeaderClick = () => {
        if(!this.state.showContent){
            this.setState({showContent:true})
        }else{
            this.setState({showContent:false,changePassword:false,changeUsername:false})
        }
    }


    onUsernameSubmit = (event) => {
        event.preventDefault()
        if(this.state.error){
            alert(this.state.error)
        }else{
            this.props.changeUsername({
                newUsername:this.state.newUsername,
                username:this.props.username
            })
        }
        this.setState({showContent:false,newUsername:''})
    }


    onPasswordSubmit = (event) => {
        event.preventDefault()
        this.props.changePassword({
            username:this.props.username,
            newPassword:this.state.newPassword
        })
        this.setState({showContent:false,newPassword:''})
    }


    onChannelSubmit = (event) => {
        event.preventDefault()
        if(this.state.error){
            alert(this.state.error)
        }else{
            this.props.createChannel({channelName:this.state.channelName,created_by:this.props.username})
        }
        
        this.setState({newChannel:false,channelName:'',error:''})
    }


    renderUsernameInputForm = () => {
        if(this.state.changeUsername){
            const input = renderInputField('','username','text',this.onUsernameChange,this.state.newUsername,null,'5')
            return(
                <div>
                    <form onSubmit={(event)=>this.onUsernameSubmit(event)} className='d-flex justify-content-center'>
                        {input}
                        <button type="submit" className="btn btn-dark rounded py-0 m-3">Change Username</button>
                        <button 
                            className="btn btn-info rounded py-0 m-3"
                            onClick={()=>this.setState({changeUsername:false,newUsername:'',error:''})}
                        >Back</button>
                    </form>
                    <small className='text-danger m-0 p-0'>{this.state.error}</small>
                </div>
            )
        }
    }
    
    
    renderChannelInputForm = () => {
        if(this.state.newChannel){
            const input = renderInputField('','channel','text',this.onChannelChange,this.state.channelName,null,'5')
            return(
                <div>
                    <form onSubmit={(event)=>this.onChannelSubmit(event)} className='d-flex justify-content-center'>
                        {input}
                        <button type="submit" className="btn btn-dark rounded py-0 m-3">Create</button>
                        <button 
                            className="btn btn-info rounded py-0 m-3"
                            onClick={()=>this.setState({newChannel:false,channelName:'',error:''})}
                        >Back</button>
                    </form>
                    <small className='text-danger m-0 p-0'>{this.state.error}</small>
                </div>
            )
        }
    }


    renderPasswordInputForm = () => {
        if(this.state.changePassword){
            const input = renderInputField('','password','password',this.onPasswordChange,this.state.newPassword,null,'9')
            return(
                <form onSubmit={event=>{this.onPasswordSubmit(event)}} className='d-flex justify-content-center'>
                    {input}
                    
                    <button type="submit" className="btn btn-dark rounded py-0 m-3">Change Password</button>
                    <button 
                        className="btn btn-info rounded py-0 m-3"
                        onClick={()=>this.setState({changePassword:false})}
                    >Back</button>
                </form>
            )
        }
    }


    renderHeaderButtons = () =>{
        if(!(this.state.changePassword||this.state.changeUsername||this.state.newChannel)){
            return(
                <div className='d-flex justify-content-center mb-2'>
                <button 
                    className='btn btn-primary p-0 mx-4'
                    onClick={()=>{this.setState({changeUsername:true})}}
                >Change Username</button>
                <button 
                    className='btn btn-primary py-0 mx-4'
                    onClick={()=>{this.setState({changePassword:true})}}
                >Change Password</button>
                <button 
                    className='btn btn-primary py-0 mx-4'
                    onClick={()=>{this.setState({newChannel:true})}}
                >New Channel</button>
                <button 
                    className='btn btn-warning py-0 mx-4'
                    onClick={()=>{
                        localStorage.removeItem('token');
                        localStorage.removeItem('currentChat');
                        localStorage.removeItem('isChannel');
                        localStorage.clear();
                        history.push('/user')
                    }}
                >Logout</button>
            </div>
            )
        }
        return
    }


    renderHeaderContent = () => {
        if(this.state.showContent){
            return (
                <React.Fragment>
                    {this.renderHeaderButtons()}
                    {this.renderUsernameInputForm()}
                    {this.renderPasswordInputForm()}
                    {this.renderChannelInputForm()}
                </React.Fragment>
            )
        }
    }


    render(){
        return (
        <div style={{borderBottom:'solid black 1px'}}>
            <h4
            className='text-danger'
            style={{fontFamily:'Impact, Charcoal, sans-serif',cursor:'pointer',fontWeight:'100'}}
            onClick={this.onHeaderClick}
            >
                {this.props.username}
            </h4>
            {this.renderHeaderContent()}
        </div>
        
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        username:state.user.username
    }
}

export default connect(mapStateToProps,{changeUsername,changePassword,createChannel})(Header);