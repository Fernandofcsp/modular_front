import { EmployeesTableHeadRow, EmployeesTableRow } from "../moleculs";




enum TableHeaders {
	tipo = "Tipo",
	fechaInicio = "Fecha de inicio",
	fechaFinal = "Fecha de regreso",
	tiempo = "Tiempo",
	opciones = "Opciones"
}

interface IInconsistenciasTable {
	id : number
}

export const InconsistenciasTable = ({ id } : IInconsistenciasTable) => {
	const inconsistenciasFilteredById = inconsistencias.filter(element => element.id === id)

	return (
		<div className="relative overflow-x-auto shadow-lg sm:rounded-lg mt-sm">
			{
				inconsistenciasFilteredById.length > 0 &&
				<table className="w-full text-md text-left text-gray-500">
					<thead className="text-md text-gray-700 uppercase bg-gray-50 sticky top-0">
						<tr>
							{
								Object.entries(TableHeaders).map((e, i) => {
									return <EmployeesTableHeadRow key={i} title={e[1]} />
								})
							}
						</tr>
					</thead>
					<tbody>
						{
							inconsistenciasFilteredById.map((e, i) => <EmployeesTableRow key={i} id={ id } minutes={ e.minutes } tipo={ e.tipo } fechaFin={ e.fechaFinal } fechaInicio={ e.fecha } /> )
						}
					</tbody>
				</table>
			}
		</div>
	)
}
