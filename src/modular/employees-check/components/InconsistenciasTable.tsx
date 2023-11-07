import { EmployeesTableHeadRow, EmployeesTableRow } from "../moleculs";


const date = new Date();
const inconsistencias = [
	{
		id: 1,
		fecha: date,
		nombre: "Retraso",
		tiempo: "10 minutos",
	},
	{
		id: 1,
		fecha: date,
		nombre: "Retraso",
		tiempo: "5 minutos",
	},
	{
		id: 2,
		fecha: date,
		nombre: "Falta",
		tiempo: "0",
	},
	{
		id: 2,
		fecha: date,
		nombre: "Vacaciones",
		tiempo: "1 día",
	}
]

enum TableHeaders {
	tipo = "Tipo",
	fechaInicio = "Fecha de inicio",
	fechaFinal = "Fecha de regreso",
	tiempo = "Tiempo"
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
					<thead className="text-md text-gray-700 uppercase bg-gray-50">
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
							inconsistenciasFilteredById.map((e, i) => <EmployeesTableRow key={i} tiempo={ e.tiempo } tipo={ e.nombre } fechaFin={ e.fecha } fechaInicio={ e.fecha } /> )
						}
					</tbody>
				</table>
			}
		</div>
	)
}
