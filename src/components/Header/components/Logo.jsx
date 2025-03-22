import styled from 'styled-components';

const IconContainer = ({ className }) => {
	return (
		<div className={className}>
			<i className="fa fa-code" aria-hidden="true"></i>
		</div>
	);
};

const Icon = styled(IconContainer)`
	font-size: 70px;
	margin-right: 10px;
`;

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
		<div className={className}>
			<Icon />
			<div>
				<LargeText>Блог</LargeText>
				<SmallText>Веб-разработчика</SmallText>
			</div>
		</div>
	);
};

export const Logo = styled(logoContainer)`
	display: flex;
	margin-top: -14px;
`;

export default Logo;
