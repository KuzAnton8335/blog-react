import styled from 'styled-components';
import { ControlPanel } from './components/control-panel/controlPanel';
import { Logo } from './components/logo/Logo';

const Descroption = styled.div`
	font-style: italic;
`;

const Header = ({ className }) => {
	return (
		<header className={className}>
			<Logo />
			<Descroption>
				Веб-технологии
				<br /> Написание кода
				<br /> Разбор ошибок
			</Descroption>
			<ControlPanel />
		</header>
	);
};

const StyledHeader = styled(Header)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 920px;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0 -7px 35px 9px #616161;
	background-color: #fff;
`;

export default StyledHeader;
