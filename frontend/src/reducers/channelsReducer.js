import {FETCH_CHANNELS,CREATE_CHANNEL,DELETE_CHANNEL} from '../actions/types';

export default (state=[],action)=>{
    switch(action.type){
        case FETCH_CHANNELS:
            return action.payload
        case CREATE_CHANNEL:
            return [...state,action.payload]
        case DELETE_CHANNEL:
            return state.filter(channel=>channel.id!==action.payload)
        default:
            return state
    }
}