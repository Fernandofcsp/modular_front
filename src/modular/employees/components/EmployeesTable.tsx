import { useState } from 'react';
import { TableHeadItem } from '../../users/moleculs';
import { TableBodyRow } from '../moleculs';

interface IEmployee {
	id: string,
	name: string,
	admisionDate: string,
	position: string,
}

enum TableHeaders {
	id = "ID",
	name = "Nombre",
	admisionDate = "Fecha de ingreso",
	job = "Puesto",
	ver = "Ver"
}


const initialState : IEmployee[] = [{id: "2", name: "Name name", admisionDate: "04/05/2020", position: "JEFE"}];


export const EmployeesTable = () => {
	const [employees, setEmployees] = useState(initialState);

	// const getUsers = async () => {
	// 	try {
	// 		const { data } = await axios.get(`${apiUrl}/users`, { params: { take: 20, skip: 0 } });
	// 		setUsers(data);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	// useEffect(() => {
	// 	getUsers();
	// }, []);

	return (
		<div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
			<table className="w-full text-md text-left text-gray-500">
				<caption className="px-md py-sm text-xl font-semibold text-left text-gray-900 bg-white">
					Empleados
				</caption>
				<thead className="text-md text-gray-700 uppercase bg-gray-50">
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
							return <TableBodyRow key={i} id={employee.id} name={employee.name} creationDate={employee.admisionDate} job={employee.position} />
						})
					}
				</tbody>
			</table>
		</div>

	)
}
