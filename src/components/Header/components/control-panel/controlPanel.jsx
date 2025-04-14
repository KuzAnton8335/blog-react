import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../../../../actions';
import ROLE from '../../../../constans';
import {
	selectUserLogin,
	selectUserRole,
	selectUserSession,
} from '../../../../selectors';
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
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectUserSession);

	return (
		<div className={className}>
			{/* изменение кнопки при авторизации  */}
			<RightAlign>
				<Button>
					{roleId === ROLE.GUEST ? (
						<Link to="/login">Войти</Link>
					) : (
						<>
							<div>{login}</div>
							<StyledIcon onClick={() => dispatch(logout(session))}>
								<Icon id="fa-sign-out" margin="10px 0 0 0" />
							</StyledIcon>
						</>
					)}
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
