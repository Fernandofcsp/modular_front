import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../../api";
import { userStore } from "../../../store/userStore";
interface IEmployeeSelector {
  employee_id: number;
  first_name: string;
  last_name1: string;
  setId: (employee_id: number) => void;
}

export const EmployeesSelector = ({ employee_id, setId }: IEmployeeSelector) => {
  const token = userStore((state) => state.token);
  const [employees, setEmployees] = useState<IEmployeeSelector[]>([]);

  const getUsers = async () => {
    try {
      //const { data } = await axios.request<IEmployeesResponse>(config);
      const { data } = await axios.get<IEmployeeSelector[]>(
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
      setEmployees(data);
    } catch (error) {
      console.log(error);
    }
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
