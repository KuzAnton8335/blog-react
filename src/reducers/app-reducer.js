// начальное состояние
import { ACTION_TYPE } from '../actions/index.js';

const initialAppState = {
	wasLogout: false,
};

// сам reducer
export const AppReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			};
		default:
			return state;
	}
};
