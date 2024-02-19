import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../../api";
import { userStore } from "../../../store/userStore";

interface IEmployee {
  employee_id: number;
  first_name: string;
  last_name1: string;
}

interface IEmployeeSelectProps {
  employee_id: number;
  setId: (employee_id: number) => void;
}

export const EmployeesSelector = ({ employee_id, setId }: IEmployeeSelectProps) => {
  const token = userStore((state) => state.token);
	const [employees, setEmployees] = useState<IEmployee[]>([]);

  const getUsers = async () => {
		setEmployees([{ employee_id: 1, first_name: "Francisco", last_name1: "Saldivar" }])

    /*try {
			
      //const { data } = await axios.request<IEmployeesResponse>(config);
			const { data } = await axios.get<IEmployee[]>(
        `${apiUrl}/employees`,
        {
          headers: {
            "Accept-Encoding": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: { take: 20, skip: 0 },
        }
      );
			setEmployees([{ employee_id: 1, first_name: "Francisco", last_name1: "Saldivar" }])
      //setEmployees(data);
    } catch (error) {
      console.log(error);
    }*/
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-end justify-end">
      <select
        className="py-sm px-md rounded-md"
        value={employee_id}
        onChange={({ target }) => setId(parseInt(target.value))}
      >
        <option defaultChecked value={-1}>
          Seleccione
        </option>
        {employees.map((employee) => {
          return (
            <option key={employee.employee_id} value={employee.employee_id}>
              {employee.first_name + " " + employee.last_name1}
            </option>
          );
        })}
      </select>
    </div>
  );
};
