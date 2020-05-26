import {LOGIN_FORM_SUBMIT,SIGNUP_FORM_SUBMIT} from '../actions/types'

export default (state='',action)=> {
    switch(action.type){
        case SIGNUP_FORM_SUBMIT:
            return action.payload
        case LOGIN_FORM_SUBMIT:
            return action.payload
        default:
             return state
    }
}