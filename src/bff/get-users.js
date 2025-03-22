// запрос на сервер для получения списка пользователей
export const getUsers = () =>
	fetch('http://localhost:3005/users').then((loadedUsers) => loadedUsers.json());
