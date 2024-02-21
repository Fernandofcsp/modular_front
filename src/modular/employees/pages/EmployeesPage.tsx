import Layout from "../../../ui/layout/Layout";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { EmployeesTable } from "../components";

export const EmployeesPage = () => {
  const [filterEmployee, setFilter] = useState<boolean>(false); // Inicializa filter como false (valor booleano)

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const booleanValue = value === "1"; // Convierte "1" a true y "0" a false
    setFilter(booleanValue);
  };
  return (
    <Layout>
      <div>
        <div className="flex justify-end items-center py-md">
          <div className="px-md">
            <select
              onChange={handleSelectChange}
              className="text-white text-lg uppercase bg-gray-800 hover:font-semibold px-md py-xsm rounded-md hover:bg-gray-600"
            >
              <option value={"1"} selected disabled>
                Filtrar
              </option>
              <option value={"0"}>Activos</option>
              <option value={"1"}>Inactivos</option>
            </select>
          </div>

          <div>
            <NavLink
              to={"/newEmployee"}
              className="text-white text-lg uppercase bg-blue-800 hover:font-semibold px-md py-xsm rounded-md hover:bg-blue-600"
            >
              Nuevo empleado
            </NavLink>
          </div>
          
        </div>
		<EmployeesTable filterEmployee={filterEmployee} />
      </div>
    </Layout>
  );
};
