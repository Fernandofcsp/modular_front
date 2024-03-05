import { useState } from "react";
import { MovementTableHeader, MovementTableRow } from "../moleculs";
import { NavigateButton } from '../../../ui/moleculs/NavigateButton';
import mas from "../../../../public/assets/icons/mas.png";
import { NewMovementForm } from "./NewMovementForm";
import { CreateExcelButton } from "../../../ui/moleculs";
import { IMovement, IMovements } from "../interfaces/interfaces";
import moment from "moment";

const tableHeaders = ["ID", "Referencia", "Concepto", "Cantidad", "Fecha movimiento", "Fecha creación", "Más"];

export const AccountMovements = (props: IMovements) => {
	const { idAccount, movements } = props;

	const [newMovement, setNewMovement] = useState(false);
	const [editMovement, setEditMovement] = useState(false);
	const [selectedMovement, setSelectedMovement] = useState<IMovement>();



	return (
		<div className="flex flex-col my-2xl">
			<div className="flex justify-between w-10/12">
				<p className="text-xl">Movimientos de la cuenta</p>
				{
					(!newMovement && !editMovement) &&
					<div className="flex flex-col space-y-sm">
						{movements.length > 0 && <CreateExcelButton onClick={() => console.log("Creando excel...")} />}
						<NavigateButton image={mas} title="Nuevo" onClick={() => setNewMovement(true)} />
					</div>
				}
			</div>
			{
				(newMovement || editMovement) ? 
					newMovement ? <NewMovementForm idAccount={idAccount} setShow={setNewMovement} show={newMovement} />
						: <NewMovementForm idAccount={idAccount} setShow={setNewMovement} show={newMovement} edit movementData={selectedMovement}/>
					: movements.length > 0 ? (
						<div className="w-10/12 overflow-x-auto shadow-lg my-md">
							<table className="w-full text-md text-left text-gray-500 rounded-xl">
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
												movement={{
													id: mov.id,
													date: moment(mov.date, "DD-MM-YYYY").format("YYYY-MM-DD"),
													amount: mov.amount,
													created_at: mov.created_at,
													account: mov.account,
													reference: mov.reference,
													concept: mov.concept
												}}
												setSelectedMovement={setSelectedMovement}
												setEditMovement={setEditMovement}
												setNewMovement={setNewMovement}
											/>
										})
									}
								</tbody>
							</table>
						</div>
					) : <p className="mt-lg text">Aún no existen movimientos para esta cuenta</p>
			}
		</div>
	)
}
