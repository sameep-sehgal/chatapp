import {
    LOGIN_FORM_SUBMIT,
    SIGNUP_FORM_SUBMIT,
    FETCH_USER, 
    CHANGE_USERNAME,
    CHANGE_PASSWORD,
} from '../actions/types'



export default (state='',action)=> {
    switch(action.type){
        case SIGNUP_FORM_SUBMIT:
            return action.payload
        case LOGIN_FORM_SUBMIT:
            return action.payload
        case FETCH_USER:
            return action.payload
        case CHANGE_USERNAME:
            return action.payload
        case CHANGE_PASSWORD:
            return action.payload
        default:
             return state
    }
}