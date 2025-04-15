import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../../../../actions';
import ROLE from '../../../../constants';
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
	align-items: center;
`;

const StyledIcon = styled.div`
	cursor: pointer;
`;

const StyledBackIcon = styled.div`
	cursor: pointer;
`;


const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
`

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
				{roleId === ROLE.GUEST ? (
						<Button>
							<Link to="/login">Войти</Link>
						</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<StyledIcon>
							<Icon id="fa-sign-out" margin="0 0 0 10px"
								  onClick={() => dispatch(logout(session))} />
						</StyledIcon>
					</>
				)}
			</RightAlign>
			<RightAlign>
				<StyledBackIcon onClick={() => navigate(-1)}>
					<Icon id="fa-backward" margin="10px 0 0 0" />
				</StyledBackIcon>
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
