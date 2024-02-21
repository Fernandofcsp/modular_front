import { NavLink } from "react-router-dom";
import { useState } from "react";

export const EmployeesOptions: React.FC<{ onSelect: (value: string) => void }> = ({ onSelect }) => {
	const [selectedValue, setSelectedValue] = useState('');
	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setSelectedValue(value);
		onSelect(value); // Llama a la función onSelect y pasa el valor seleccionado
	  };
  

  return (
    <div className="flex justify-end items-center py-md">
      <div className="px-md">
        <select
		  value={selectedValue} 
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