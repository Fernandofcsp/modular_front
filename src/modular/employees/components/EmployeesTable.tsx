import { useEffect, useState } from 'react';
import axios from 'axios';
import { TableHeadItem } from '../../users/moleculs';
import { TableBodyRow } from '../moleculs/TableBodyRow';
import { apiUrl } from '../../../api';
import { toast } from 'react-toastify';
//import { userStore } from '../../../store/userStore';

enum TableHeaders {
	id = "ID",
	name = "Nombre",
	admisionDate = "Fecha de ingreso",
	status = "Status",
	ver = "Ver"
}

export interface IBenefits {
	id: number,
	employee: number,
	type: string,
	quantity: number
}

export interface IEmployee {
	id: number;
	first_name: string;
	last_name: string;
	position_name: string;
	daily_salary: number;
	admision_date: string;
	status: boolean;
	created_at: string;
	created_by: number;
	updated_at: string;
	updated_by: number | null;
	benefits?: IBenefits[];
}

export const EmployeesTable = () => {
	//const token = userStore(state => state.token);
	const [employees, setEmployees] = useState<IEmployee[]>([]);

	const getUsers = () => {
		axios.get(
			`${apiUrl}/employees/`,
			{ validateStatus: (status) => status < 500 }
		)
			.then(({ data, status }) => {
				if (status != 200) throw ({ ...data, status });
				setEmployees(data);
			})
			.catch(error => toast.error(error.message + " " + error.status));
	}

	useEffect(() => {
		getUsers();
	}, []); // Solo se ejecuta al montar el componente, no es necesario volver a ejecutarlo cuando cambia el filtro

	return (
		<div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
			<table className="w-full text-md text-left text-gray-500">
				<caption className="px-md py-sm text-xl font-semibold text-left text-gray-900 bg-white">
					Empleados
				</caption>
				<thead className="text-md text-gray-700 uppercase bg-gray-50 sticky top-0">
					<tr>
						{
							Object.entries(TableHeaders).map((e, i) => {
								return <TableHeadItem key={i} title={e[1]} />
							})
						}
					</tr>
				</thead>
				<tbody>
					{

						employees.map((employee, i) => {
							return <TableBodyRow
								key={i}
								id={employee.id}
								admision_date={employee.admision_date}
								name={`${employee.first_name} ${employee.last_name}`}
								status={employee.status}
							/>
						})
					}
				</tbody>
			</table>
		</div>
	);
}