import { useState } from 'react';
import { BenefitForm } from '../moleculs';
import { IBenefit } from '../interfaces/EmployeeInterfaces';
import axios from 'axios';
import { apiUrl } from '../../../api';
import { toast } from 'react-toastify';

interface IBenefitsTable {
	employeeId: number | string,
	isDisabled: boolean,
	benefits: IBenefit[]
}


export const BenefitsTable = (props: IBenefitsTable) => {
	const { employeeId, isDisabled, benefits } = props;
	const [formBenefitVisible, setFormBenefitVisible] = useState(false);
	const [selectedId, setSelectedId] = useState(0);
	const [typeBenefit, setTypeBenefit] = useState("");
	const [quantityBenefit, setQuantityBenefit] = useState(0);
	const [newBenefit, setNewBenefit] = useState(false);


	const deleteBenefit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number, benefit: string) => {
		event.preventDefault();

		if (confirm(`¿Está seguro que desea eliminar el beneficio '${benefit}'`)) {
			const data = {
				isActive: false
			}
			axios.patch(
				`${apiUrl}/benefits/${id}/`,
				data,
				{ validateStatus: (status: number) => status < 500 }
			)
				.then(
					({ data, status }) => {
						console.log(data);
						if (status != 200) throw ({ ...data, status });
						toast.success(data.message);
					}
				)
				.catch(error => toast.error(error.message));
		}
	}


	const createBenefit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		setNewBenefit(true);
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
								<button hidden={isDisabled} onClick={(event) => { createBenefit(event) }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-xsm px-sm rounded disabled:bg-gray-800">
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
									<tr className="odd:bg-white" key={e.id}>
										<th scope="row" className="px-md py-sm font-medium text-gray-900 whitespace-nowrap ">
											{e.type}
										</th>
										<td className="px-md py-sm">
											{e.quantity}
										</td>
										<td className="px-md py-sm space-x-xsm">
											<button onClick={(event) => deleteBenefit(event, e.id, e.type)} className="bg-red-800 hover:bg-red-900 text-white font-bold py-xsm px-sm rounded disabled:bg-gray-800" hidden={isDisabled} disabled={newBenefit}>
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
				formBenefitVisible && <BenefitForm idEmployee={employeeId} setVisible={setFormBenefitVisible} idBenefit={selectedId} benefitType={typeBenefit} benefitQuantity={quantityBenefit} setNewBenefit={setNewBenefit} />
			}
		</div>

	)
}
