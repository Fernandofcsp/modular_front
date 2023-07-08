import { userStore } from '../../store/userStore';
import { useNavigate } from 'react-router-dom';

export const ModularPage = () => {
	const { id, name, rol, token } = userStore((state) => state);
	const logout = userStore((state) => state.logout);
	const navigate = useNavigate();
	return (
		<div>
			<p>Tu ID: {id}</p>
			<p>Nombre: {name}</p>
			<p>Rol: {rol}</p>
			<p>Token: {token}</p>
			<button
				className='bg-green-500 px-3 py-2 rounded-[16px]'
				onClick={() => {
					logout();
					navigate('/login');
				}}
			>
				Logout
			</button>
		</div>
	);
};
