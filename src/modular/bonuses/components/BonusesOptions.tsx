import { NavLink } from 'react-router-dom';

export const AccountsOptions = () => {
	return (
		<div className="flex justify-end items-center py-md">
			<NavLink to={"/newBonus"} className="text-white text-lg uppercase bg-blue-800 hover:font-semibold px-md py-xsm rounded-md hover:bg-blue-600">Agregar ingreso o egreso</NavLink>
		</div>
	)
}
