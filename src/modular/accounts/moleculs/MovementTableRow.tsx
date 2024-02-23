import { IMovement } from "../components"


export const MovementTableRow = (props: IMovement) => {
	const { reference, accountId, concept, createdDate, createdUserId, movementDate, movementId, quantity, updatedDate, updatedUserId } = props;
	return (
		<tr className="bg-white border-b-2 text-center">
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{accountId}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{movementId}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{reference}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{concept}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				${new Intl.NumberFormat().format(quantity)}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{movementDate}
			</th>
			<td className="px-md py-md">
				{createdDate}
			</td>
			<td className="px-md py-md">
				{createdUserId}
			</td>
			<td className="px-md py-md">
				{updatedDate}
			</td>
			<td className="px-md py-md">
				{updatedUserId}
			</td>
			<td className="px-md py-md">
				Editar
			</td>
		</tr>
	)
}
