import styled from 'styled-components';

const IconContainer = ({ className, id, ...props }) => {
	return (
		<div className={className} {...props}>
			<i className={`fa ${id}`} aria-hidden="true"></i>
		</div>
	);
};

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin }) => margin};
`;
