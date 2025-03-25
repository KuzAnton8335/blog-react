import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '../icon/Icon';

const LargeText = styled.div`
	font-size: 68px;
	font-weight: 700;
	line-height: 48px;
	margin-top: 18px;
`;

const SmallText = styled.div`
	font-size: 18px;
	font-weight: 700;
`;

const logoContainer = ({ className }) => {
	return (
		<Link className={className} to="/">
			<Icon id="fa-code" size="70px" margin=" 0 10px 0 0" />
			<div>
				<LargeText>Блог</LargeText>
				<SmallText>Веб-разработчика</SmallText>
			</div>
		</Link>
	);
};

export const Logo = styled(logoContainer)`
	display: flex;
	margin-top: -21px;
	color: #000;
`;
