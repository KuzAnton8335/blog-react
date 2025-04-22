import { generateDate } from './generate-date.js';
// добавление пользователя
export const addUser = async (login, password) => {
	// добавление нового пользователя в базу данных
	const response = fetch('http://localhost:3005/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			body: JSON.stringify({
				login: login,
				password: password,
				registed_at: generateDate(),
				role_id: 2,
			}),
		},
	});
	if (!response.ok) throw new Error('Ошибка при добавлении пользователя')
	return response.json();
};
