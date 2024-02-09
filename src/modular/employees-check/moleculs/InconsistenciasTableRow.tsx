import { Link } from "react-router-dom";

interface IRow {
	id : number,
	tipo : number,
	fechaInicio : Date,
	fechaFin : Date | string,
	minutes : number | null
}

const tiposInconsistencia = ["Falta", "Retardo", "Vacaciones", "Incapacidad"];

export const EmployeesTableRow = ( props : IRow ) => {
	const { fechaInicio, fechaFin, minutes, tipo } = props;
	return (
		<tr className="bg-white border-b">
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{tiposInconsistencia[tipo]}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{fechaInicio.toString()}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{
					tipo === 0 || tipo === 1 ?
						"N/A" :
						fechaFin.toString()
				}
			</th>
			<td className="px-md py-md">
				{
					tipo === 1 ? minutes : "N/A"
				}
			</td>
			<td className="px-md py-md text-blue-700">
				<Link className="text-blue-700 font-bold" state={props} to={`/inconsistency-detail`}>Detalle</Link>
			</td>
		</tr>
	)
}
