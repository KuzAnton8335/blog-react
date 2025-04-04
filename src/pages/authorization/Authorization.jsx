import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import { setUser } from '../../actions';
import { server } from '../../bff';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import H2 from '../../components/h2/H2';

//схема авторизации при помощи yup
const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните поле логина')
		.matches(/^\w+$/, 'Неверный логин. Допускаются только буквы и цифры')
		.min(3, 'Неверный логин. Минимум 3 символа')
		.max(15, 'Неверный логин. Максимум 15 символов'),

	password: yup
		.string()
		.required('Заполните поле пароля')
		.matches(
			/^[\w#%]+$/,
			'Неверный пароль. Допускаются только буквы, цифры, и знаки # %',
		)
		.min(6, 'Неверно заполнено  поля пароля, пароль должен быть не менее 6 символов')
		.max(30, 'Неверно заполнено  поля пароля,  Максимум 30 символов'),
});

const StyledLink = styled(Link)`
	font-size: 18px;
	text-aligen: center;
	text-decoration: underline;
	margin: 20px 0;
`;

const ErrorMessage = styled.div`
	margin: 10px 0 0;
	padding: 10px;
	font-size: 18px;
	background-color: #f88a89;
`;

// условия авторизации при помощи useForm и yupResolver
const AuthorizationContainer = ({ className }) => {
	// функция dispatch
	const dispatch = useDispatch();
	// переменные для работы формы авторизации
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});
	//  переменная для вывода ошибок сервера
	const [serverError, setServerError] = useState(null);
	// обработка ошибки сервера на форме авторизации
	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса:${error}`);
				return;
			}
			dispatch(setUser(res));
		});
	};
	// ошибки формы авторизации
	const formError = errors?.login?.message || errors?.password?.message; // Исправлено
	// ошибки сервера при авторизации
	const errorMessage = formError || serverError;

	return (
		<div className={className}>
			<H2>Регистрация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit">Авторизоватся</Button>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<StyledLink to="/register">Регистрация</StyledLink>
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
		width: 260px;
	}
`;

export default Authorization;
