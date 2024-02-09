import { Link } from "react-router-dom";


interface IAccountRow {
	id: string,
	date: string,
	referency: string,
	concept: string,
	total: number
}

export const TableBodyRow = (props: IAccountRow) => {
	const { id, date, referency, concept, total } = props;
	return (
		<tr className="bg-white border-b">
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{id}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{date}
			</th>
			<td className="px-md py-md">
				{referency}
			</td>
			<td className="px-md py-md">
				{concept}
			</td>
			<td className="px-md py-md">
				${new Intl.NumberFormat().format(total)}
			</td>
			<td className="px-md py-md">
				<Link to={`/account`} state={id}><p className="text-blue-600">Más</p></Link>
			</td>
		</tr>
	)
}
