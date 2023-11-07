
interface IRow {
	tipo : string
	fechaInicio : Date
	fechaFin : Date
	tiempo : string
}

export const EmployeesTableRow = ( props : IRow ) => {
	const { fechaInicio, fechaFin, tiempo, tipo } = props;
	return (
		<tr className="bg-white border-b">
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{tipo}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{fechaInicio.toString()}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{fechaFin.toString()}
			</th>
			<td className="px-md py-md">
				{tiempo}
			</td>
		</tr>
	)
}
