import styled from 'styled-components';
const H2Container = ({ children, className }) => {
	return <h2 className={className}>{children}</h2>;
};

const H2 = styled(H2Container)`
	margin: 40px 0;
`;

export default H2;
