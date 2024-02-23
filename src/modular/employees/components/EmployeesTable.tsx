import { useEffect, useState } from 'react';
import axios from 'axios';
import { TableHeadItem } from '../../users/moleculs';
import { TableBodyRow } from '../moleculs/TableBodyRow';
import { apiUrl } from '../../../api';
import { userStore } from '../../../store/userStore';
enum TableHeaders {
	id = "ID",
	name = "Nombre",
	admisionDate = "Fecha de ingreso",
	status = "Status",
	ver = "Ver"
}

export interface IBenefits {
	id: number,
	type: string,
	quantity: number
}

export interface IEmployee {
	employee_id: number;
	first_name: string;
	last_name1: string;
	last_name2: string;
	daily_salary: number;
	admision_date: string;
	status: boolean;
	created_date: Date | null;
	created_user_id: number;
	updated_date: Date | null;
	updated_user_id: number | null;
	benefits?: IBenefits[];
}

const aux: IEmployee = {
	employee_id: 1,
	first_name: 'Francisco',
	last_name1: 'Saldívar',
	last_name2: 'Fonseca',
	daily_salary: 400,
	admision_date: '21/01/2023',
	status: true,
	created_date: null,
	created_user_id: 2,
	updated_date: null,
	updated_user_id: null,
	benefits: [{id: 1, type: "Vales de gasolina", quantity: 800}, {id: 2, type: "Vales de despensa", quantity: 1000}]
}

export const EmployeesTable = () => {
	const token = userStore(state => state.token);
	const [employees, setEmployees] = useState<IEmployee[]>([]);

	const getUsers = async () => {
		setEmployees([aux])
		try {
			//const { data } = await axios.request<IEmployeesResponse>(config);
			const { data } = await axios.get<IEmployee[]>(`${apiUrl}/employees`, {
				headers: {
					"Accept-Encoding": "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				}, params: { take: 20, skip: 0 }
			});
			//setEmployees(data);
		} catch (error) {
			console.log(error);
		}
	}

  useEffect(() => {
    getUsers();
  }, []); // Solo se ejecuta al montar el componente, no es necesario volver a ejecutarlo cuando cambia el filtro

  const employeesFilteredByStatus = employees.filter(element => (element.status) === !filterEmployee);
console.log(filterEmployee+"hola")
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
            
            employeesFilteredByStatus.map((employee, i) => {
              return <TableBodyRow
                
                key={i}
                id={employee.employee_id}
                admision_date={employee.admision_date}
                name={`${employee.first_name} ${employee.last_name1} ${employee.last_name2}`}
                status={employee.status}
                employee={employee}
              />
            })
          }
        </tbody>
      </table>
    </div>
  );
}