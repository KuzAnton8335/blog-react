import { addUser } from './add-user.js';
import { createSession } from './create-session.js';
import { getUser } from './get-user.js';
// запросы на сервер
export const server = {
	// авторизация пользователя
	async authorize(authLogin, authPassword) {
		// запрос на сервер для получения списка пользователя
		const user = await getUser(authLogin);

		//проверка вывода пользователя
		if (!user) {
			return {
				error: 'Такой пользователь не найден',
				res: null,
			};
		}
		// проверка на пароль при авторизации
		if (authPassword !== user.password) {
			return {
				error: 'Неверный пароль',
				res: null,
			};
		}

		// добавление в сессию информации о пользователе
		return {
			error: null,
			res: createSession(user.role_id),
		};
	},
	// регистрация пользователя
	async register(regLogin, regPassword) {
		// запрос на сервер для получения списка пользователей
		const user = await getUser(regLogin);

		//проверка вывода пользователя
		if (!user) {
			return {
				error: 'Такой логин уже зарегистрирован',
				res: null,
			};
		}

		// добавление нового пользователя
		await addUser(regLogin, regPassword);

		// сессия для пользователя
		const sessison = {
			logout() {
				Object.keys(sessison).forEach((key) => delete sessison[key]);
			},
			removeComment() {
				console.log('Удаления комментария');
			},
		};

		return {
			error: null,
			res: createSession(user.role_id),
		};
	},
};

export default server;
