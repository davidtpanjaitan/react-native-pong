import { combineReducers } from 'redux';
import { TimeReducer }from './TimeReducer';


export default combineReducers({
    time: TimeReducer
})

