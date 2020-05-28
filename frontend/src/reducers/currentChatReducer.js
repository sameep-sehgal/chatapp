import {SET_CURRENT_CHAT} from '../actions/types';

export default (state=localStorage.getItem('currentChat'),action)=>{
    switch(action.type){
        case SET_CURRENT_CHAT:
            return action.payload
        default:
            return state
    }
}