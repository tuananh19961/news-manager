import * as types from './../constants/ActionTypes';
var initialState = {};

const Gym = (state = initialState, action) => {
	switch(action.type){
		case types.GET_DATA:
			state = action.datas;
			return {...state};
		case types.ADD_NEW:
			console.log(action.gym);
			return {...state}
		default:
			return {...state};
	}
}

export default Gym;