// генерация новой даты для регистрации нового пользователя
const generateDate = () => {
	new Date(Math.random() * 1000000000000 + 1999999999999)
		.toISOString()
		.substring(0, 16)
		.replace('T', ' ');
};

export const server = {
	// авторизация пользователя
	async authorize(authLogin, authPassword) {
		// запрос на сервер для получения списка пользователей
		const users = await fetch('http://localhost:3005/users').then((loadedUsers) =>
			loadedUsers.json(),
		);
		// получение пользователя по логину
		const user = users.find(({ login }) => login === authLogin);
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
		// сессия для пользователя
		const sessison = {
			logout() {
				Object.keys(sessison).forEach((key) => delete sessison[key]);
			},
			removeComment() {
				console.log('Удаления комментария');
			},
		};
		// добавление в сессию информации о пользователе
		return {
			error: null,
			res: sessison,
		};
	},
	// регистрация пользователя
	async register(regLogin, regPassword) {
		// запрос на сервер для получения списка пользователей
		const users = await fetch('http://localhost:3005/users').then((loadedUsers) =>
			loadedUsers.json(),
		);
		// получение пользователя по логину
		const user = users.find(({ login }) => login === regLogin);

		//проверка вывода пользователя
		if (user) {
			return {
				error: 'Такой логин уже зарегистрирован',
				res: null,
			};
		}

		// добавление нового пользователя
		await fetch('http://localhost:3005/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				body: JSON.stringify({
					login: regLogin,
					password: regPassword,
					registed_at: generateDate(),
					role_id: 2,
				}),
			},
		});

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
			res: sessison,
		};
	},
};

export default server;
