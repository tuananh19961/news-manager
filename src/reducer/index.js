import {combineReducers} from 'redux';
import Gym from './Gym';

const appReducer = combineReducers({
	Gym: Gym
});

export default appReducer;