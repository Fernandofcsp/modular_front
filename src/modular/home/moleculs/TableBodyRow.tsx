import { IMovement } from "../../accounts/interfaces/interfaces";

export const TableBodyRow = (props: IMovement) => {
	const { reference, concept, date, amount, account } = props;

	return (
		<tr className="bg-white border-b text-center">
			<td className="px-md py-md">{account.name}</td>
			<td className="px-md py-md">{reference}</td>
			<td className="px-md py-md">{concept}</td>
			<td className="px-md py-md">{date}</td>

			<td className="px-md py-md">$ {new Intl.NumberFormat().format(amount)}</td>
		</tr>
	)
}
