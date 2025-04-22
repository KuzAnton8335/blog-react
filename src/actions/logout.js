import { server } from '../bff';
import { ACTION_TYPE } from './action-type.js';


export const logout = (session) => async (dispatch) => {
	try {
		await server.logout(session);
		dispatch({
			type: ACTION_TYPE.LOGOUT,
		});
	} catch (error) {
		console.error("Logout failed:", error);
		dispatch({
			type: ACTION_TYPE.LOGOUT_ERROR,
			error: error.message,
		})
	}
};
