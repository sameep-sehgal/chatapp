import {combineReducers} from 'redux';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import channelsReducer from './channelsReducer';

export default combineReducers({
    user:userReducer,
    channels:channelsReducer,
    users:usersReducer,
})