import { useState } from 'react';
import { IBenefits } from './EmployeesTable';
import { BenefitForm } from '../moleculs';

interface IBenefitsTable {
	edit: boolean,
	benefits: IBenefits[]
}
export const BenefitsTable = (props: IBenefitsTable) => {
	const { benefits, edit } = props;
	const [formBenefitVisible, setFormBenefitVisible] = useState(false);
	const [selectedId, setSelectedId] = useState(0);
	const [typeBenefit, setTypeBenefit] = useState("");
	const [quantityBenefit, setQuantityBenefit] = useState(0);
	const [newBenefit, setNewBenefit] = useState(true);

	const deleteBenefit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
		event.preventDefault();

		if (confirm("¿Está seguro que desea eliminar el beneficio?")) {
			alert("Eliminado " + id)
			//Colocar peticion http para eliminar el beneficio
		}
	}

	const editBenefit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number, benefit: string, quantity: number) => {
		event.preventDefault();
		setNewBenefit(false);
		setSelectedId(id);
		setTypeBenefit(benefit);
		setQuantityBenefit(quantity);
		setFormBenefitVisible(true);
	}

	const createBenefit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		setNewBenefit(false);
		setSelectedId(0);
		setTypeBenefit("");
		setQuantityBenefit(0);
		setFormBenefitVisible(true);
	}

	return (
		<div>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500">
					<thead className="text-lg text-gray-700 uppercase">
						<tr>
							<th scope="col" className="px-md py-sm">
								<p className='text-blue-900'>Beneficios del empleado</p>
							</th>
							<th scope="col" className="px-md py-sm">
								<p></p>
							</th>
							<th scope="col" className="px-md py-sm flex justify-end items-center">
								<button hidden={edit} onClick={(event) => { createBenefit(event) }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-xsm px-xsm rounded disabled:bg-gray-800" disabled={edit}>
									<img src='../../../assets/icons/mas.png' className='w-md' />
								</button>
							</th>
						</tr>
					</thead>
					<thead className="text-lg text-gray-700 uppercase bg-gray-50 ">
						<tr>
							<th scope="col" className="px-md py-sm">
								Tipo de beneficio
							</th>
							<th scope="col" className="px-md py-sm">
								Cantidad
							</th>
							<th scope="col" className="px-md py-sm">
								Más
							</th>
						</tr>
					</thead>
					<tbody>
						{
							benefits.length > 0 && benefits.map(e => {
								return (
									<tr className="odd:bg-white">
										<th scope="row" className="px-md py-sm font-medium text-gray-900 whitespace-nowrap ">
											{e.type}
										</th>
										<td className="px-md py-sm">
											{e.quantity}
										</td>
										<td className="px-md py-sm space-x-xsm">
											<button onClick={(event) => editBenefit(event, e.id, e.type, e.quantity)} className="bg-green-800 hover:bg-green-600 text-white font-bold py-xsm px-sm rounded disabled:bg-gray-800" hidden={edit} disabled={newBenefit}>
												<img src='../../../assets/icons/editar.png' className='w-md' />
											</button>
											<button onClick={(event) => deleteBenefit(event, e.id)} className="bg-red-800 hover:bg-red-900 text-white font-bold py-xsm px-sm rounded disabled:bg-gray-800" hidden={edit} disabled={newBenefit}>
												<img src='../../../assets/icons/delete.png' className='w-md' />
											</button>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
			{
				formBenefitVisible && <BenefitForm setVisible={setFormBenefitVisible} newBenefit={newBenefit} idBenefit={selectedId} benefitType={typeBenefit} benefitQuantity={quantityBenefit} />
			}
		</div>

	)
}
