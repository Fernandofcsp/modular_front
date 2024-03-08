import { useState, useEffect } from "react";
import { TableBodyRow, TableHeadItem } from "../moleculs";
import axios from 'axios';
import { apiUrl } from "../../../api";
import { toast } from "react-toastify";
import { userStore } from "../../../store/userStore";
import { FilterStatusButton } from "../../../ui/moleculs/FilterStatusButton";
import * as XLSX from 'xlsx';
import { CreateExcelButton } from "../../../ui/moleculs";

enum TableHeaders {
	name = "Nombre",
	email = "Correo",
	rol = "Permisos",
	creationDate = "Estado",
	ver = "Ver"
}

interface IUser {
	id: string,
	user_name: string,
	email: string,
	role: string,
	is_active: boolean
}


export const UsersTable=() => {
	const idUser = userStore(state => state.id);
	const [users, setUsers] = useState<IUser[]>([]);
	const [estatus, setEstatus] = useState<boolean | null>(true);

  const handleStatusChange = (value: boolean | null ) => {
    setEstatus(value);
  };

	const exportarAExcel = () => {
		const wb = XLSX.utils.book_new();
		const ws = XLSX.utils.json_to_sheet(users);
		XLSX.utils.book_append_sheet(wb, ws, 'Datos');
		XLSX.writeFile(wb, `file.xlsx`);
	};

	const getUsers = () => {
		axios.get(
			`${apiUrl}/users/`,
			{ validateStatus: (status) => status < 500 }
		)
			.then(({ data, status }) => {
				if (status != 200) throw ({ ...data, status });
				setUsers(data);
			})
			.catch(error => toast.error(error.message + " " + error.status));
	}

	useEffect(() => {
		getUsers();
	}, [])


	return (
		<div>
			<div className="flex flex-row justify-end space-x-md my-md">
				<FilterStatusButton onChange={handleStatusChange} />
				{ users.length > 0 && <CreateExcelButton onClick={() => exportarAExcel()} /> }
			</div>
		<div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
			
			<table className="w-full text-md text-left text-gray-500">
				<caption className="px-md py-sm text-xl font-semibold text-left text-gray-900 bg-white">
					Usuarios del sistema
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
						users.filter(user => user.id != idUser && user.is_active == estatus).map((user, i) => {
							

							return <TableBodyRow key={i} id={user.id} name={user.user_name} email={user.email} rol={user.role} isActive={user.is_active } />
						})
					}
				</tbody>
			</table>
		</div>
		</div>
	)
}
