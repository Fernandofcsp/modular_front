import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BenefitForm } from '../moleculs';
import { IBenefits } from './EmployeesTable';
import { apiUrl } from '../../../api';

interface IBenefitsTable {
	employeeId: number | string,
	isDisabled: boolean,
}


export const BenefitsTable = (props: IBenefitsTable) => {
	const { employeeId, isDisabled } = props;
	const [benefits, setBenefits] = useState<IBenefits[]>([]);
	const [formBenefitVisible, setFormBenefitVisible] = useState(false);
	const [selectedId, setSelectedId] = useState(0);
	const [typeBenefit, setTypeBenefit] = useState("");
	const [quantityBenefit, setQuantityBenefit] = useState(0);
	const [newBenefit, setNewBenefit] = useState(false);


	useEffect(() => {
		getBenefits();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	

	const getBenefits = () => {
		axios.get<IBenefits[]>(
			`${apiUrl}/benefits/`,
			{ validateStatus: (status: number) => status < 500 }
		)
			.then(({ data, status }) => {
				if (status != 200) throw ({ ...data, status });
				setBenefits(data.filter(benefit => benefit.employee == employeeId));
			})
			.catch(error => toast.error(error.message + " " + error.status));
	}

	const deleteBenefit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
		event.preventDefault();

		if (confirm("¿Está seguro que desea eliminar el beneficio?")) {
			alert("Eliminado " + id)
			//Colocar peticion http para eliminar el beneficio
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
									<tr className="odd:bg-white">
										<th scope="row" className="px-md py-sm font-medium text-gray-900 whitespace-nowrap ">
											{e.type}
										</th>
										<td className="px-md py-sm">
											{e.quantity}
										</td>
										<td className="px-md py-sm space-x-xsm">
											<button onClick={(event) => deleteBenefit(event, e.id)} className="bg-red-800 hover:bg-red-900 text-white font-bold py-xsm px-sm rounded disabled:bg-gray-800" hidden={isDisabled} disabled={newBenefit}>
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
				formBenefitVisible && <BenefitForm idEmployee={employeeId} setVisible={setFormBenefitVisible} idBenefit={selectedId} benefitType={typeBenefit} benefitQuantity={quantityBenefit} />
			}
		</div>

	)
}
