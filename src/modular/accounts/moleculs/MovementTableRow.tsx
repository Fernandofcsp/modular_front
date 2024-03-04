import { IMovement } from "../interfaces/interfaces";



export const MovementTableRow = (props: IMovement) => {
	const { reference, amount, concept, created_at, date, id } = props;
	return (
		<tr className="bg-white border-b-2 text-center">
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{id}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{reference}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{concept}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				${new Intl.NumberFormat().format(amount)}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{date}
			</th>
			<td className="px-md py-md">
				{created_at}
			</td>
			<td className="px-md py-md">
				Editar
			</td>
		</tr>
	)
}
