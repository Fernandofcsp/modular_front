import { NavLink } from "react-router-dom";

interface IBodyItem {
	id: string,
	name: string,
	creationDate: string
	job: string,
}

export const TableBodyRow = (props: IBodyItem) => {
	const { id, name, job, creationDate } = props;
	return (
		<tr className="bg-white border-b">
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{id}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{name}
			</th>
			<td className="px-md py-md">
				{creationDate}
			</td>
			<td className="px-md py-md">
				{job}
			</td>
			<td className="px-md py-md">
				<NavLink className="text-blue-700 font-bold" to={`/employee/${id}`}>Detalle</NavLink>
			</td>
		</tr>
	)
}
