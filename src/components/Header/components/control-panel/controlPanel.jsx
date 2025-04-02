import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../../Button/Button';
import { Icon } from '../icon/Icon';

const RightAlign = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const StyledIcon = styled.div`
	cursor: pointer;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	return (
		<div className={className}>
			<RightAlign>
				<Button>
					<Link to="/login">Войти</Link>
				</Button>
			</RightAlign>
			<RightAlign>
				<StyledIcon onClick={() => navigate(-1)}>
					<Icon id="fa-backward" margin="10px 0 0 0" />
				</StyledIcon>
				<Link to="/post">
					<Icon id="fa-file-text-o" margin="10px 0 0 17px" />
				</Link>
				<Link to="/users">
					<Icon id="fa-users" margin="10px 0 0 17px" />
				</Link>
			</RightAlign>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
