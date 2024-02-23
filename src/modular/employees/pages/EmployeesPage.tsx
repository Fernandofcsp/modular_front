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
        <div className="flex justify-end items-center py-md gap-md">
          <button className="text-white text-lg uppercase bg-blue-800  px-md py-xsm rounded-md hover:bg-blue-600">
          <NavLink
            to={"/newEmployee"}
            
          >
            Nuevo empleado
          </NavLink>
          </button>
        </div>
        <EmployeesTable />
      </div>
    </Layout>
  );
};
