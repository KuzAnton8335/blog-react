import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useStore, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import { setUser } from '../../actions';
import { server } from '../../bff';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import H2 from '../../components/h2/H2';
import ROLE from '../../constants';
import {
	selectUserRole,
} from '../../selectors';

//схема авторизации при помощи yup
const registerFormSchema = yup.object().shape({
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
	passcheck: yup
		.string()
		.required('Заполните повторно поле пароля')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});


const ErrorMessage = styled.div`
	margin: 10px 0 0;
	padding: 10px;
	font-size: 18px;
	background-color: #f88a89;
`;

// условия авторизации при помощи useForm и yupResolver
const RegistrationContainer = ({ className }) => {
	// функция dispatch
	const dispatch = useDispatch();
	// информация о состоянии хранилища
	const store = useStore();
	// роль пользователя
	const roleId = useSelector(selectUserRole);

	// вызывается функция subscribe() в качестве параметра которой передается функция,
	// которая будет вызываться каждый раз, когда изменится состояние хранилища.
	useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout;
		// создаем подпищика на событие logout
		const unsubscribe = store.subscribe(() => {
			let prevWasLogout = currentWasLogout;
			currentWasLogout = store.getState().app.wasLogout;

			if(!currentWasLogout !== prevWasLogout) {
				reset();
			}
			return unsubscribe;
		})
	},[store])

	// переменные для работы формы авторизации
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(registerFormSchema),
	});
	//  переменная для вывода ошибок сервера
	const [serverError, setServerError] = useState(null);
	// обработка ошибки сервера на форме авторизации
	const onSubmit = ({ login, password }) => {
		server.register(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса:${error}`);
				return;
			}
			dispatch(setUser(res));
		});
	};
	// ошибки формы авторизации
	const formError = errors?.login?.message ||
		errors?.password?.message || errors?.passcheck?.message; // Исправлено
	// ошибки сервера при авторизации
	const errorMessage = formError || serverError;

	//переход на главную страницу
	if(roleId !== ROLE.GUEST) {
		<Navigate to="/"/>
	}
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
				<Input
					type="password"
					placeholder="Проверка пароля..."
					{...register('passcheck', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit">Зарегистрироваться</Button>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				</form>
		</div>
	);
};

const Registration = styled(RegistrationContainer)`
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

export default Registration;
