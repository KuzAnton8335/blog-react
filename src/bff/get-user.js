

// export const getUser = async (loginToFind) => {
// 	fetch(`http://localhost:3005/users?login=${loginToFind}`)
// 		.then((loadedUsers) => loadedUsers.json())
// 		.then(([loadedUser]) => loadedUser]));
// };
// получение пользователя по логину
export const getUser = async (loginToFind) => {
	try{
		const response = await fetch(`http://localhost:3005/users?login=${loginToFind}`);
		if(!response.ok){
			throw new Error(`Ошибка ${response.status}`)
		}
		const loadedUser = await response.json();
		return loadedUser[0] || null;
	} catch (error){
		console.error('Ошибка ответа сервера', error)
		throw error;
	}
}
