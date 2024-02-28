export interface IMovementRow {
	reference: string,
	concept: string,
	date: string,
	account: string,
	total: string
}

export const TableBodyRow = (props: IMovementRow) => {
	const { reference, concept, date, account, total } = props;

	return (
		<tr className="bg-white border-b">
			<th
				scope="row"
				className="px-md py-md font-medium text-gray-900 whitespace-nowrap "
			>
				{account}
			</th>
			<td className="px-md py-md">{reference}</td>
			<td className="px-md py-md">{concept}</td>
			<td className="px-md py-md">{date}</td>

			<td className="px-md py-md">{total}</td>
		</tr>
	)
}
