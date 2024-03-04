import { MovementTableHeader, MovementTableRow } from "../moleculs";
import { NavigateButton } from '../../../ui/moleculs/NavigateButton';
import { useEffect, useState } from "react";
import mas from "../../../../public/assets/icons/mas.png";
import { NewMovementForm } from "./NewMovementForm";
import { CreateExcelButton } from "../../../ui/moleculs";
import { IMovements } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";

const tableHeaders = ["ID", "Referencia", "Concepto", "Cantidad", "Fecha movimiento", "Fecha creación", "Más"];

export const AccountMovements = (props: IMovements) => {
	const { idAccount, movements } = props;
	const navigate = useNavigate();

	const [newMovement, setNewMovement] = useState(false);

	useEffect(() => {
		if(newMovement)
			navigate(0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newMovement])
	

	return (
		<div className="flex flex-col my-2xl">
			<div className="flex justify-between w-10/12">
				<p className="text-xl">Movimientos de la cuenta</p>
				{
					!newMovement &&
						<div className="flex flex-col space-y-sm">
							{ movements.length > 0 && <CreateExcelButton onClick={() => console.log("Creando excel...")} /> }
							<NavigateButton image={mas} title="Nuevo" onClick={() => setNewMovement(true)} />
						</div>
				}
			</div>
			{
				newMovement ? <NewMovementForm idAccount={idAccount} setShow={setNewMovement} show={newMovement}/>
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
											id={mov.id}
											date={mov.date}
											amount={mov.amount}
											created_at={mov.created_at}
											account={mov.account}
											reference={mov.reference}
											concept={mov.concept}

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
