import { TableHeadItem } from "../../users/moleculs";
import { TableBodyRow } from "../moleculs";
import { IAccountsData } from '../data';

enum TableHeaders {
	id = "ID",
	date = "Fecha",
	referency = "Referencia",
	concept = "Concepto",
	total = "Total"
}

interface ITableProps{
	accountsData: IAccountsData[]
}

export const AccountsTable = ({ accountsData } : ITableProps) => {
	//console.log(accountsData);
	return (
		<div className="relative overflow-x-auto shadow-lg sm:rounded-lg h-[400px]">
			<table className="w-full text-md text-left text-gray-500">
				<caption className="px-md py-sm text-xl font-semibold text-left text-gray-900 bg-white">
					Cuentas
				</caption>
				<thead className="text-md text-gray-700 uppercase bg-gray-50">
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
						accountsData.map((data, i) => {
							return <TableBodyRow
								key={i}
								date={data.fecha}
								id={data.id}
								referency={data.referencia}
								concept={data.concepto}
								total={data.total}
							/>
						})
					}
				</tbody>
			</table>
		</div>
	)
}
