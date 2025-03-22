import { getUsers } from './get-users.js';
// получение пользователя по логину
export const getUser = async (loginToFind) => {
	const users = await getUsers();
	return users.find(({ login }) => login === loginToFind);
};
