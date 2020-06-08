import {ADD_NEW_MESSAGE,FETCH_NEW_MESSAGES} from '../actions/types';

export default (state=[],action) => {
    switch(action.type){
        case ADD_NEW_MESSAGE:
            return [...state,action.payload]
        case FETCH_NEW_MESSAGES:
            return action.payload
        default:
            return state

    }
}