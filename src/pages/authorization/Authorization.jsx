import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import { server } from '../../bff';

//схема авторизации при помощи yup
const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните поле логина')
		.matches(/^w+$/, 'Неверный логин. Допускаются только буквы и цифры')
		.min(3, 'Неверный логин. Минимум 3 символа')
		.max(15, 'Неверный логин. Максимум 15 символов'),

	password: yup
		.string()
		.required('Заполните поле пароля')
		.matches(
			/[\^w#%]+$/,
			'Неверный пароль. Допускаются только буквы, цифры, и знаки # %',
		)
		.min(6, 'Неверно заполнено  поля пароля, пароль должен быть не менее 6 символов')
		.max(30, 'Неверно заполнено  поля пароля,  Максимум 30 символов'),
});

// условия авторизации при помощи useForm и yupResolver
const AuthorizationContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		formState: { error },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},

		resolver: yupResolver(authFormSchema),
	});
	//  переменная для вывода ошибок сервера
	const [serverError, setServerError] = useState();
	// обработка ошибки сервера на форме авторизации
	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса:${error}`);
			} else {
				console.log(res);
			}
		});
	};
	// ошибки формы авторизации
	const formError = error?.login?.message || error?.password?.message;
	// ошибки сервера при авторизации
	const errorMessage = formError || serverError;

	return (
		<div className={className}>
			<h2>Регистрация</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type="text" placeholder="Логин..." {...register('login')} />
				<input
					type="password"
					placeholder="Пароль..."
					{...register('password')}
				/>
				<input
					type="password"
					placeholder="Повтор пароля..."
					{...register('password')}
				/>
				<button type="submit">Зарегистрироваться</button>
				{errorMessage && <div>{errorMessage}</div>}
			</form>
		</div>
	);
};

const Authorization = styled(AuthorizationContainer)`
	margin-top: 100px;
	display: flex;
	align-items: center;
	flex-direction: column;

	& > form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}
`;

export default Authorization;
