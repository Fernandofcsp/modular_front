import { NavLink } from 'react-router-dom';

export const EmployeesOptions = () => {
	return (
		<div className="flex justify-end items-center py-md">
			<NavLink to={"/newEmployee"} className="text-white text-lg uppercase bg-blue-500 hover:font-semibold px-md py-xsm rounded-md hover:bg-blue-600">Nuevo empleado</NavLink>
		</div>
	)
}
