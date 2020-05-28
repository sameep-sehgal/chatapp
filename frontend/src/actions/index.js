import {
    LOGIN_FORM_SUBMIT,
    SIGNUP_FORM_SUBMIT,
    FETCH_CHANNELS,
    FETCH_USER,
    CHANGE_USERNAME,
    FETCH_USERS,
    CHANGE_PASSWORD,
    SET_CURRENT_CHAT,
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
        payload:response.data.username
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
        payload:response.data.username
    })
    alert('Password changed successfully!')
}


export const setCurrentChat = (chat) => {
    return{
        type:SET_CURRENT_CHAT,
        payload:chat
    }
}