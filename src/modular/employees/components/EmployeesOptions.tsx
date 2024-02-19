import { NavLink } from "react-router-dom";
import { useState } from "react";

interface EmployeesOptionsProps {
  onFilterChange: (filter: string) => void;
}

export const EmployeesOptions: React.FC<EmployeesOptionsProps> = ({ onFilterChange }) => {
  const [filter, setFilter] = useState("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFilter(value);
    onFilterChange(value); // Llama a la función de devolución de llamada con el valor seleccionado
  };

  return (
    <div className="flex justify-end items-center py-md">
      <div className="px-md">
        <select
          onChange={handleSelectChange}
          className="text-white text-lg uppercase bg-gray-800 hover:font-semibold px-md py-xsm rounded-md hover:bg-gray-600"
        >
          <option value={-1} disabled>
            Filtrar
          </option>
          <option value={"1"}>Activos</option>
          <option value={"0"}>Inactivos</option>
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
  );
};