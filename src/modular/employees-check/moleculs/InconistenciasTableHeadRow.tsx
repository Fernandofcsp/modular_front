
interface IRow {
	title: string
}

export const EmployeesTableHeadRow = ( props : IRow ) => {
	return (
		<th scope="col" className="px-md py-sm">
			{props.title}
		</th>
	)
}
