import { NavLink } from "react-router-dom";

interface IBodyItem {
    id: string,
    name: string,
    email?: string, 
    rol: string,
    isActive: boolean
}

export const TableBodyRow = (props: IBodyItem) => {
  const { id, name, email, rol, isActive } = props;
  return (
    <tr className="bg-white border-b text-center">
      <th
        scope="row"
        className="px-md py-md font-medium text-gray-900 whitespace-nowrap "
      >
        {name}
      </th>
      <td className="px-md py-md">{email}</td>
      <td className="px-md py-md">{rol.toUpperCase()}</td>
      <td className="px-md py-md">
        {!isActive ? (
          <p className="text-red-500">Inactivo</p>
        ) : (
          <p className="text-green-500">Activo</p>
        )}
      </td>

      <td className="px-md py-md">
        <NavLink className="text-blue-700 font-bold" to={`/user/${id}`}>Detalle</NavLink>
      </td>
    </tr>
  );
};
