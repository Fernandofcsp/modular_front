import { useNavigate } from 'react-router-dom';
import { NavigateButton} from '../../../ui/moleculs';

export const AdminOptions = () => {
	const navigate = useNavigate();
	
	
	return (
		<div className="flex flex-row justify-end space-x-sm">
			<NavigateButton title='Nuevo usuario' onClick={() => navigate("/createUser")} />
		</div>
	)
}
