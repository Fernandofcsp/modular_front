import axios from "axios";
import { apiUrl } from "../../../api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { TableHeadItem } from "../../users/moleculs";
import { TableBodyRow } from "../moleculs";
import { Link } from "react-router-dom";
import { IMovement } from "../../accounts/interfaces/interfaces";



export const LastMovementsTable = () => {
	const [movements, setMovements] = useState<IMovement[]>([]);

	const getMovements = () => {
		axios.get(
			`${apiUrl}/movements/get-last-10`,
			{ validateStatus: (status) => status < 500 }
		)
			.then(({ data, status }) => {
				if (status != 200) throw ({ ...data, status });
				setMovements(data);
			})
			.catch(error => toast.error(error.message + " " + error.status));
	}

	useEffect(() => {
		getMovements();
	}, []); // Solo se ejecuta al montar el componente, no es necesario volver a ejecutarlo cuando cambia el filtro

	const headers = ["Cuenta", "Referencia", "Concepto", "Fecha", "Total"]
	return (
		<div className="h-[200px] relative overflow-x-auto shadow-lg sm:rounded-lg">
			<table className="w-full text-md text-left text-gray-500">
				<caption className="px-md py-sm text-xl font-semibold text-end text-gray-900 bg-white items-center">
					Ultimos movimientos realizados
					<Link to={"/accounts"} className="ml-md text-blueLetter text-end text-2xl">+</Link>
				</caption>
				<thead className="text-md text-gray-700 uppercase bg-gray-50 sticky top-0">
					<tr>
						{
							headers.map((e, i) => {
								return <TableHeadItem key={i} title={e} />
							})
						}
					</tr>
				</thead>
				<tbody>
					{

						movements.map((movement, i) => {
							return <TableBodyRow
								key={i}
								reference={movement.reference}
								concept={movement.concept}
								amount={movement.amount}
								account={movement.account}
								id={movement.id}
								created_at={movement.created_at}
								date={movement.date}
							/>
						})
					}
				</tbody>
			</table>
		</div>
	);
}
