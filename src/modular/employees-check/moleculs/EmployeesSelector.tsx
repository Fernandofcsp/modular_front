import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../../api";
//import { userStore } from "../../../store/userStore";
import { toast } from "react-toastify";

interface IEmployee {
  id: number;
  first_name: string;
  last_name: string;
}

interface IEmployeeSelectProps {
  employee_id: number;
  setId: (employee_id: number) => void;
}

export const EmployeesSelector = ({ employee_id, setId }: IEmployeeSelectProps) => {
  //const token = userStore((state) => state.token);
	const [employees, setEmployees] = useState<IEmployee[]>([]);

	const getEmployees = () => {
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
    getEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
      <select
        className="py-sm px-md rounded-md"
        value={employee_id}
        onChange={({ target }) => {setId(parseInt(target.value))}}
      >
        <option className="py-xsm px-sm" value={-1}>
          Seleccione
        </option>
        {employees.map((employee) => {
          return (
            <option className="py-xsm px-sm" key={employee.id} value={employee.id}>
              {employee.first_name + " " + employee.last_name}
            </option>
          );
        })}
      </select>
  );
};
