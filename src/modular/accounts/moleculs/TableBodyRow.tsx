import { string } from "prismarine-nbt";
import { NavLink } from "react-router-dom";

interface IBodyItem {
	id: string,
	date: string,
	name: string,
	concept: string,
	reference: string,
    quantity: string,
	typePay: string,
	total: string,
	ver: string
}

export const TableBodyRow = (props: IBodyItem) => {
	const { id, date, name, concept, reference, quantity, typePay, total } = props;
	return (
		<tr className="bg-white border-b">
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{date}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{name}
			</th>
			<td className="px-md py-md">
				{concept}
			</td>
			<td className="px-md py-md">
				{reference}
			</td>
			<td className="px-md py-md">
				{quantity}
			</td>
			<td className="px-md py-md">
				{typePay}
			</td>
			<td className="px-md py-md">
				{total}
			</td>
			<td className="px-md py-md">
				<NavLink className="text-blue-700 font-bold" to={`/account/${id}`}>Detalle</NavLink>
			</td>
		</tr>
	)
}
