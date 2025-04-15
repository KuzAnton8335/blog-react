import { server } from '../bff';
import * as ACTION_TYPE from './action-type';

export const logout = (session) => async (dispatch) => {
	try {
		await server.logout(session); // Wait for the logout to complete
		dispatch({
			type: ACTION_TYPE.LOGOUT,
		});
	} catch (error) {
		console.error("Logout failed:", error);
		// Optionally, dispatch an error action here
	}
};
