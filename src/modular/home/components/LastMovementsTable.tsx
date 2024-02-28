import axios from "axios";
import { apiUrl } from "../../../api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { TableHeadItem } from "../../users/moleculs";
import { IMovementRow, TableBodyRow } from "../moleculs";
import { Link } from "react-router-dom";


const registros: IMovementRow[] = [
	{
		reference: 'Ref-001',
		concept: 'Compra de suministros',
		date: '2024-02-27',
		account: 'Gastos Generales',
		total: '250.00'
	},
	{
		reference: 'Ref-002',
		concept: 'Venta de productos',
		date: '2024-02-26',
		account: 'Ventas',
		total: '1200.00'
	},
	{
		reference: 'Ref-003',
		concept: 'Pago de nómina',
		date: '2024-02-25',
		account: 'Nómina',
		total: '3500.00'
	},
	{
		reference: 'Ref-004',
		concept: 'Compra de equipo',
		date: '2024-02-24',
		account: 'Activos Fijos',
		total: '1800.00'
	},
	{
		reference: 'Ref-005',
		concept: 'Pago de servicios',
		date: '2024-02-23',
		account: 'Gastos Generales',
		total: '500.00'
	},
	{
		reference: 'Ref-006',
		concept: 'Venta de servicios',
		date: '2024-02-22',
		account: 'Ventas',
		total: '900.00'
	},
	{
		reference: 'Ref-007',
		concept: 'Compra de material',
		date: '2024-02-21',
		account: 'Inventario',
		total: '700.00'
	},
	{
		reference: 'Ref-008',
		concept: 'Pago de alquiler',
		date: '2024-02-20',
		account: 'Gastos Generales',
		total: '1500.00'
	},
	{
		reference: 'Ref-009',
		concept: 'Venta de productos',
		date: '2024-02-19',
		account: 'Ventas',
		total: '1800.00'
	},
	{
		reference: 'Ref-010',
		concept: 'Pago de impuestos',
		date: '2024-02-18',
		account: 'Impuestos',
		total: '1000.00'
	}
];


export const LastMovementsTable = () => {
	const [movements, setMovements] = useState<IMovementRow[]>([]);

	const getMovements = () => {
		setMovements(registros);
		/*
		axios.get(
			`${apiUrl}/lastMovements/`,
			{ validateStatus: (status) => status < 500 }
		)
			.then(({ data, status }) => {
				if (status != 200) throw ({ ...data, status });
				setMovements(data);
			})
			.catch(error => toast.error(error.message + " " + error.status));*/
	}

	useEffect(() => {
		getMovements();
	}, []); // Solo se ejecuta al montar el componente, no es necesario volver a ejecutarlo cuando cambia el filtro

	const headers = ["Referencia", "Concepto", "Cuenta", "Total", "Fecha"]
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
								total={movement.total}
								account={movement.account}
								date={movement.date}
							/>
						})
					}
				</tbody>
			</table>
		</div>
	);
}
