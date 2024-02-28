import { MovementTableHeader, MovementTableRow } from "../moleculs";
import { NavigateButton } from '../../../ui/moleculs/NavigateButton';
import { useState } from "react";
import mas from "../../../../public/assets/icons/mas.png";
import { NewMovementForm } from "./NewMovementForm";
import { CreateExcelButton } from "../../../ui/moleculs";

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
	idAccount: number,
	movements: IMovement[]
}

const tableHeaders = ["ID cuenta","ID movimiento", "Referencia", "Concepto", "Cantidad", "Fecha movimiento", "Fecha creación", "Creado por", "Fecha actualización", "Actualizado por", "Más"];

export const AccountMovements = (props: IAccountMovements) => {
	const { idAccount, movements } = props;

	const [newMovement, setNewMovement] = useState(false);
	return (
		<div className="flex flex-col my-md">
			<div className="flex justify-between w-10/12">
				<p className="text-xl">Movimientos de la cuenta</p>
				{
					!newMovement &&
						<div className="flex flex-col space-y-sm">
							<CreateExcelButton onClick={() => console.log("Creando excel...")} />
							<NavigateButton image={mas} title="Nuevo" onClick={() => setNewMovement(true)} />
						</div>
				}
			</div>
			{
				newMovement ? <NewMovementForm idAccount={idAccount} setShow={setNewMovement} show={newMovement}/>
				:
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
			}
		</div>
	)
}
