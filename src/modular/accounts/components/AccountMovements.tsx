import { MovementTableHeader, MovementTableRow } from "../moleculs";

export interface IMovement {
	movementId: number,
	accountId: number,
	reference: string,
	concept: string,
	quantity: number,
	movementDate: string,
	createdDate: string,
	createdUserId: number,
	updatedDate: string,
	updatedUserId: number
}

export interface IAccountMovements {
	movements: IMovement[]
}

const tableHeaders = ["ID cuenta","ID movimiento", "Referencia", "Concepto", "Cantidad", "Fecha movimiento", "Fecha creación", "Creado por", "Fecha actualización", "Actualizado por", "Más"];

export const AccountMovements = (props: IAccountMovements) => {
	const { movements } = props;
	return (
		<div className="flex flex-col my-sm">
			<p className="text-xl">Movimientos de la cuenta</p>
			<div className="w-10/12 overflow-x-auto shadow-lg my-md">
				<table className="text-md text-left text-gray-500 rounded-xl">
					<thead className="bg-gray-50">
						<tr>
							{
								tableHeaders.map((e, i) => {
									return <MovementTableHeader key={i} title={e} />
								})
							}
						</tr>
					</thead>
					<tbody>
						{
							movements.map((mov, i) => {
								return <MovementTableRow
									key={i}
									movementId={mov.movementId}
									accountId={mov.accountId}
									reference={mov.reference}
									concept={mov.concept}
									quantity={mov.quantity}
									movementDate={mov.movementDate}
									createdDate={mov.createdDate}
									createdUserId={mov.createdUserId}
									updatedDate={mov.updatedDate}
									updatedUserId={mov.updatedUserId}
								/>
							})
						}
					</tbody>
				</table>
			</div>
			
		</div>
	)
}
