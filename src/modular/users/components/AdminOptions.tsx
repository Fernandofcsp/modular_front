import { useNavigate } from 'react-router-dom';
import { CreateExcelButton, NavigateButton} from '../../../ui/moleculs';

export const AdminOptions = () => {
	const navigate = useNavigate();
	
	
	return (
		<div className="flex flex-row justify-end space-x-sm">
			
			<CreateExcelButton onClick={() => console.log("Creando excel...")} />
			<NavigateButton title='Nuevo usuario' onClick={() => navigate("/createUser")} />
			
		</div>
	)
}
