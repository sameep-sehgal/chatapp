import {combineReducers} from 'redux';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import channelsReducer from './channelsReducer';
import currentChatReducer from './currentChatReducer';
import messagesReducer from './messagesReducer';
import newMessagesReducer from './newMessagesReducer';

export default combineReducers({
    user:userReducer,
    channels:channelsReducer,
    users:usersReducer,
    currentChat:currentChatReducer,
    messages:messagesReducer,
    // newMessages:newMessagesReducer,
})