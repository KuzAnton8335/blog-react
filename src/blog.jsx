import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Footer } from './components/Footer/Footer';
import StyledHeader from './components/Header/';
import Authorization from './pages/authorization/Authorization';
import Registration from "./pages/registration/Registration.jsx";

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

const Content = styled.div`
	padding: 120px 0;
`;

const Blog = () => {
	return (
		<AppColumn>
			<StyledHeader />
			<Content>
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/Users" element={<div>Пользователи</div>} />
					<Route path="/post" element={<div>Новая Статья</div>} />
					<Route path="/post/postId" element={<div>Статья</div>} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Content>
			<Footer />
		</AppColumn>
	);
};

export default Blog;
