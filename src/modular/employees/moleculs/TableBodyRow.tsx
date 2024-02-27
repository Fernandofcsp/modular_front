import { Link } from "react-router-dom";

interface IBodyItem {
	id: number,
	name: string,
	admision_date: string,
	status: boolean,
}

export const TableBodyRow = (props: IBodyItem) => {
	const { id, name, status, admision_date } = props;
	console.log(props)
	return (
		<tr className="bg-white border-b">
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{id}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{name}
			</th>
			<td className="px-md py-md">
				{admision_date.toString().split("T")[0]}
			</td>
			{
				!status ? 
					<td className="px-md py-md text-red-500">Inactivo</td> 
					: <td className="px-md py-md text-green-500">Activo</td>
			}

			<td className="px-md py-md">
				<Link className="text-blue-700 font-bold" to={`/employee/${id}`}>Detalle</Link>
			</td>
		</tr>
	)
}
