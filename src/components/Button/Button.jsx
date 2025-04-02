import styled from 'styled-components';

export const ButtonContainer = ({ children, className, width, ...props }) => {
	return (
		<button type="submit" className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	width: ${({ width = '100%' }) => width};
	display: flex;
	justify-content: center;
	padding: 15px 40px;
	background-color: #afafaf;
	color: #1c1c1c;
	border: 1px solid #000;

	&:hover {
		cursor: pointer;
	}
`;
