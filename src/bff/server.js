import { addUser } from './add-user.js';
import { getUser } from './get-user.js';
import { sessions } from './sessions.js';
// запросы на сервер
export const server = {
	// удаления сессии пользователя
	async logout(session) {
		sessions.remove(session);
	},
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
			res: {
				id: user.id,
				login: user.login,
				roleId: user.role_id,
				session: sessions.create(),
			},
		};
	},
	// регистрация пользователя
	async register(regLogin, regPassword) {
		// запрос на сервер для получения списка пользователей
		const existingUser = await getUser(regLogin);

		//проверка вывода пользователя
		if (existingUser) {
			return {
				error: 'Такой логин уже зарегистрирован',
				res: null,
			};
		}

		// добавление нового пользователя
		await addUser(regLogin, regPassword);

		// получаем данные нового пользователя
		const newUser = await getUser(regLogin);
		if (!newUser) {
			return {
				error: 'Ошибка при регистрации',
				res: null,
			};
		}

		// сессия для пользователя
		const session = {
			logout() {
				Object.keys(session).forEach((key) => delete session[key]);
			},
			removeComment() {
				console.log('Удаления комментария');
			},
		};

		return {
			error: null,
			res: {
				id: newUser.id,
				login: newUser.login,
				roleId: newUser.role_id,
				session: sessions.create(newUser),
			},
		};
	},
};

export default server;
