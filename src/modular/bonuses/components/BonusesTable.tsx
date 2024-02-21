import { TableHeadItem } from "../../users/moleculs";
import { TableBodyRow } from "../moleculs";
import { IBonusesData } from '../data';

enum TableHeaders {
    mes = "No.",
    numeroMes = "Mes",
    anio = "Año",
    fechaCreacion = "Fecha de creacion",
    totalVentas = "Total de ventas",
    totalBonos = "Total de bonos",
    mas = "Más"
}

interface ITableProps{
	bonusesData: IBonusesData[];
    selectedYear: number | null;
}



export const BonusesTable = ({ bonusesData, selectedYear } : ITableProps) => {
	
	return (
		<div className="relative overflow-x-auto shadow-lg sm:rounded-lg h-[400px] mt-md mb-md rounded-lg">
			<table className="w-full relative text-md text-left text-gray-500 ">
				<caption className="px-md py-sm text-xl font-semibold text-left text-gray-900 bg-white">
					Bonos del {selectedYear}
				</caption>
				<thead className="text-md text-gray-700 uppercase bg-gray-50 sticky top-0">
					<tr>
						{
							Object.entries(TableHeaders).map((e, i) => {
								return <TableHeadItem key={i} title={e[1]} />
							})
						}
					</tr>
				</thead>
				<tbody>
					{
						bonusesData.map((data, i) => {
							return <TableBodyRow
								key={i}
								mes={data.mes}
								numeroMes={data.numeroMes}
								anio={data.anio}
								fechaCreacion={data.fechaCreacion}
								totalVentas={data.totalVentas}
                                totalBonos={data.totalBonos}
							/>
						})
					}
				</tbody>
			</table>
		</div>
	)
}
