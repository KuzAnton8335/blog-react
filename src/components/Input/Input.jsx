import { forwardRef } from 'react';
import styled from 'styled-components';

export const InputContainer = forwardRef(({ className, ...props }, ref) => {
	return (
		<input
			type="text"
			placeholder="Логин..."
			className={className}
			{...props}
			ref={ref}
		/>
	);
});

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	height: 40px;
	margin: 0 0 10px;
	padding: 5px;
	font-size: 18px;
	border: 1px solid #000;
`;
