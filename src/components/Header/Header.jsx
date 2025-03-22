import styled from 'styled-components';
import Logo from './components';

const Header = ({ className }) => {
	return (
		<header className={className}>
			<Logo />
		</header>
	);
};

const StyledHeader = styled(Header)`
	position: fixed;
	top: 0;
	width: 920px;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0 -7px 35px 9px #616161;
	background-color: #fff;
`;

export default StyledHeader;
