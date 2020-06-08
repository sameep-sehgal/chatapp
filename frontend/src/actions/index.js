import {
    LOGIN_FORM_SUBMIT,
    SIGNUP_FORM_SUBMIT,
    FETCH_CHANNELS,
    FETCH_USER,
    CHANGE_USERNAME,
    FETCH_USERS,
    CHANGE_PASSWORD,
    SET_CURRENT_CHAT,
    CREATE_CHANNEL,
    DELETE_CHANNEL,
    FETCH_MESSAGES,
    ADD_NEW_MESSAGE,
    FETCH_NEW_MESSAGES,
    SAVE_MESSAGE,
    } from './types';
import djangoBackend from '../apis/djangoBackend';
import history from '../history'


//ACTION CREATORS

export const loginFormSubmit = (userData) => async dispatch => {
    let payload=''
    try{
        var response = await djangoBackend.post('api/users/login',userData)
        if(response.status===200){ //returns an error if request is not successful
            localStorage.setItem('token',response.data.token)
            payload=userData.username
        }
    }catch(err){
        alert('Invalid Credentials')
        payload=''
    }

    dispatch({
        type:LOGIN_FORM_SUBMIT,
        payload
    })
    history.push('/')
}


export const signupFormSubmit = userData => async dispatch => {
    const response = await djangoBackend.post('api/users/signup',userData)
    localStorage.setItem('token',response.data.token)

    dispatch({
        type:SIGNUP_FORM_SUBMIT,
        payload:response.data.username
    })
    history.push('/')
}


export const fetchChannels = () => async dispatch => {
    const response = await djangoBackend.get('api/channels/',{
        headers:{
            Authorization:`Token ${localStorage.getItem('token')}`
        }
    })
    dispatch({
        type:FETCH_CHANNELS,
        payload:response.data
    })
}


export const fetchUsers = () => async dispatch => {
    const response = await djangoBackend.get('api/users/',{
        headers:{
            Authorization:`Token ${localStorage.getItem('token')}`
        }
    })
    dispatch({
        type:FETCH_USERS,
        payload:response.data
    })
}


export const fetchUser = () => async dispatch =>{
    const token = localStorage.getItem('token')
    const response = await djangoBackend.post('api/users/fetchUsername',{token},{
        headers:{
            Authorization:`Token ${localStorage.getItem('token')}`
        }
    })

    dispatch({
        type:FETCH_USER,
        payload:response.data
    })
}


export const changeUsername = (data) => async dispatch =>{
    const response = await djangoBackend.post('api/users/changeUsername',data,{
        headers:{
            Authorization:`Token ${localStorage.getItem('token')}`
        }
    })

    dispatch({
        type:CHANGE_USERNAME,
        payload:response.data.username
    })
    alert('Username changed successfully!')
}


export const changePassword = (data) => async dispatch =>{
    const response = await djangoBackend.post('api/users/changePassword',data,{
        headers:{
            Authorization:`Token ${localStorage.getItem('token')}`
        }
    })

    dispatch({
        type:CHANGE_PASSWORD,
        payload:response.data
    })
    alert('Password changed successfully!')
}


export const setCurrentChat = (chat) => {
    return{
        type:SET_CURRENT_CHAT,
        payload:chat
    }
}


export const createChannel = (data) => async dispatch =>{
    const response = await djangoBackend.post('api/createChannel/',data,{
        headers:{
            Authorization:`Token ${localStorage.getItem('token')}`
        }
    })

    dispatch({
        type:CREATE_CHANNEL,
        payload:response.data
    })
    alert('Channel created successsfully')
}


export const deleteChannel = (channelId) => async dispatch =>{
    const response = await djangoBackend.delete(`api/deleteChannel/${channelId}`,{
        headers:{
            Authorization:`Token ${localStorage.getItem('token')}`
        }
    })

    dispatch({
        type:DELETE_CHANNEL,
        payload:channelId
    })
    alert('Channel deleted successsfully')
}



export const fetchMessages = (channelId) => async dispatch =>{
    const response=await djangoBackend.get(`api/fetchMessages/${channelId}`,{
        headers:{
            Authorization:`Token ${localStorage.getItem('token')}`
        }
    })
    const messages = JSON.stringify(response.data.messages.slice(response.data.messages.length-10))
    localStorage.setItem(`channelMessage${channelId}`,messages)
    console.log(localStorage.getItem(`channelMessage${channelId}`))
    dispatch({
        type:FETCH_MESSAGES,
        payload:response.data.messages
    })
}


export const addNewMessage = (message) => {
    let newMessages = JSON.parse(localStorage.getItem(`channelMessage${message.channelId}`))
    console.log(newMessages)
    if(newMessages){
        newMessages.push(message)
        newMessages=JSON.stringify(newMessages)
        localStorage.setItem(`channelMessage${message.channelId}`,newMessages)
    }else{
        newMessages=JSON.stringify([message])
        localStorage.setItem(`channelMessage${message.channelId}`,newMessages)
    }

    return{
        type:ADD_NEW_MESSAGE,
        payload:message
    }
}


export const addNewMessageToReducerOnly = (message) => {
    return{
        type:ADD_NEW_MESSAGE,
        payload:message
    }
}


export const fetchNewMessages = (channelId) => {
    let newMessages = JSON.parse(localStorage.getItem(`channelMessage${channelId}`))
    console.log(newMessages)
    let payload=[]
    if(newMessages){
        payload = newMessages
    }else{
        newMessages=JSON.stringify([])
        localStorage.setItem(`channelMessage${channelId}`,newMessages)
    }
    return {
        type:FETCH_NEW_MESSAGES,
        payload
    }
}


export const saveMessage = (message) => async dispatch =>{
    const response=await djangoBackend.post(`api/saveMessage/`,message,{
        headers:{
            Authorization:`Token ${localStorage.getItem('token')}`
        }
    })
    console.log(response)
    dispatch({
        type:SAVE_MESSAGE
    })
}
