import { TableHeadItem } from "../../users/moleculs";
import { IAccounts } from "../interfaces/interfaces";
import { TableBodyRow } from "../moleculs";

enum TableHeaders {
	id = "ID",
	name = "Nombre",
	date = "Fecha",
	createdBy = "Creador",
	mas = "Más"
}


export const AccountsTable = ({ accounts } : IAccounts) => {
	//console.log(accountsData);
	return (
		<div className="relative overflow-x-auto shadow-lg sm:rounded-lg h-[400px]">
			<table className="w-full text-md text-left text-gray-500">
				<caption className="px-md py-sm text-xl font-semibold text-left text-gray-900 bg-white">
					Cuentas
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
						accounts.map((account, i) => {
							return <TableBodyRow
								key={i}
								name={account.name}
								created_at={account.created_at}
								id={account.id}
								created_by={account.created_by}
							/>
						})
					}
				</tbody>
			</table>
		</div>
	)
}
