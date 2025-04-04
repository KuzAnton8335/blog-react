import { ACTION_TYPE } from '../actions/action-type';
import ROLE from '../constans/role';

// начальное состояние
const initialUserState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
};

// сам reducer
export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		// action SET__SESSION
		case ACTION_TYPE.SET_USER: {
			return {
				...state,
				...action.payload,
			};
		}
		default:
			return state;
	}
};
