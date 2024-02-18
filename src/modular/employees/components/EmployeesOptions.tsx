import { NavLink } from "react-router-dom";
export interface IFilterSelector {
	filter: boolean;
	setFilter: (filter: boolean) => void;
  }
  export const EmployeesOptions = ({ filter, setFilter }: IFilterSelector) => {
	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	  const value = event.target.value === "false";
	  setFilter(value);
	};
  return (
    <div className="flex justify-end items-center py-md">
      <div className="px-md">
        <select
          onChange={handleSelectChange}
          className=" text-white text-lg uppercase bg-gray-800 hover:font-semibold px-md py-xsm rounded-md hover:bg-gray-600"
        >
          <option value={-1} selected >
            Filtrar
          </option>
          <option value={1}>Activos</option>
          <option value={0}>Inactivos</option>
        </select>
      </div>
      <div >
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
