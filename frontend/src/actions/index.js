import {LOGIN_FORM_SUBMIT,SIGNUP_FORM_SUBMIT} from './types';

export const loginFormSubmit = (userData) => {
    console.log(userData) 
    return {
        type:LOGIN_FORM_SUBMIT,
        payload:userData.username
    }
}
export const signupFormSubmit = (userData) => {
    console.log(userData) 
    return {
        type:SIGNUP_FORM_SUBMIT,
        payload:userData.username
    }
}