import { Link } from "react-router-dom";
import { IBonus } from "../interfaces";

export const TableBodyRow = (props: IBonus) => {
  
  const { month, year, total_sales, total_bonus } = props;
  return (
    <tr className="bg-white border-b text-center">
      <th
        scope="row"
        className="px-md py-md font-medium text-gray-900 whitespace-nowrap "
      >
        {month}
      </th>
      <th
        scope="row"
        className="px-md py-md font-medium text-gray-900 whitespace-nowrap "
      >
        {year}
      </th>
      <td className="px-md py-md">
        ${new Intl.NumberFormat().format(total_sales)}
      </td>
      <td className="px-md py-md">
        ${new Intl.NumberFormat().format(total_bonus)}
      </td>

      <td className="px-md py-md">
        <Link to={`/bonuse/${month}/${year}`} >
          <p className="text-blue-600">Más</p>
        </Link>
      </td>
    </tr>
  );
};
