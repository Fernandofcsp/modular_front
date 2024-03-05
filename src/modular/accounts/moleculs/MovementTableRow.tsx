import { IMovement } from "../interfaces/interfaces";

interface IRowMovements {
	movement: IMovement,
	setSelectedMovement: (movement: IMovement) => void,
	setNewMovement: (value: boolean) => void,
	setEditMovement: (value: boolean) => void
}

export const MovementTableRow = (props: IRowMovements) => {
	const { setSelectedMovement, setNewMovement, setEditMovement } = props
	const { reference, amount, concept, created_at, date, id } = props.movement;
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
				<p className="hover:cursor-pointer text-blueLetter" onClick={() => { setNewMovement(false), setEditMovement(true), setSelectedMovement(props.movement) }}>Editar</p>
			</td>
		</tr>
	)
}
