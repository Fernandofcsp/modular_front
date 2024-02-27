import moment from "moment";
import { Link } from "react-router-dom";

interface IRow {
	id : number,
	tipo : string,
	fechaInicio : string,
	fechaFin : string,
	minutes ?: number | null
}


export const EmployeesTableRow = ( props : IRow ) => {
	const { id, fechaInicio, fechaFin, minutes, tipo } = props;
	return (
		<tr className="bg-white border-b">
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{tipo}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{fechaInicio.toString()}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{
					tipo !== "Retardo" ? fechaFin : "N/A"
				}
			</th>
			<td className="px-md py-md">
				{
					tipo === "Retardo" ? minutes : tipo === "Falta" ? "N/A" : moment(fechaFin, "DD/MM/YYYY").diff(moment(fechaInicio, "DD/MM/YYYY"), 'days')
				}
			</td>
			<td className="px-md py-md text-blue-700">
				<Link className="text-blue-700 font-bold" to={`/inconsistency-detail/${id}`}>Detalle</Link>
			</td>
		</tr>
	)
}
