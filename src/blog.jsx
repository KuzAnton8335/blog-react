import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

const Content = styled.div`
	padding: 120px 0;
`;

const H2 = styled.h2`
	text-align: center;
`;

const Header = () => {
	return <header>Шапка</header>;
};

const Footer = () => {
	return <footer>Подвал</footer>;
};

const Blog = () => {
	return (
		<>
			<Header />
			<Content>
				<H2>Контент Страницы</H2>
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route path="/login" element={<div>Авторизация</div>} />
					<Route path="/register" element={<div>Регистрация</div>} />
					<Route path="/Users" element={<div>Пользователи</div>} />
					<Route path="/post" element={<div>Новая Статья</div>} />
					<Route path="/post/postId" element={<div>Статья</div>} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Content>
			<Footer />
		</>
	);
};

export default Blog;
