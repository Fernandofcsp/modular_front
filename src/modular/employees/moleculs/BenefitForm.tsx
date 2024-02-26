import { useEffect, useState } from "react";
import { FormField, inputType } from "../../users/moleculs";
import save from "../../../../public/assets/icons/salvar.png";
import cancel from "../../../../public/assets/icons/cancel.png";
import { validateBenefitFields } from "../helpers/validateBenefitFields";
import { toast } from "react-toastify";
import axios from "axios";
import { apiUrl } from "../../../api";
import { useNavigate } from "react-router-dom";

interface IBenefitsForm {
	idEmployee: number | string, 
	setVisible: (value: boolean) => void,
	setNewBenefit: (value: boolean) => void,
	idBenefit?: number,
	benefitType?: string,
	benefitQuantity?: number
}



export const BenefitForm = (props: IBenefitsForm) => {
	const { idEmployee, setVisible, setNewBenefit, idBenefit = 0, benefitQuantity = 0, benefitType = "" } = props;
	const navigate = useNavigate();

	const [id, setId] = useState(idBenefit);
	const [type, setType] = useState(benefitType);
	const [quantity, setQuantity] = useState(benefitQuantity);

	useEffect(() => {
		setId(idBenefit);
		setType(benefitType);
		setQuantity(benefitQuantity);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id])

	const createBenefit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		const errors = validateBenefitFields(type, quantity);

		if(errors.length > 0){
			errors.map(error => toast.error(error));
			return;
		}

		const data = {
			"employee": idEmployee,
			"type": type,
			"quantity": quantity,
		}

		axios.post(
			`${apiUrl}/benefits/`,
			data,
			{ validateStatus: (status: number) => status < 500 }
		)
			.then(({ data, status }) => {
				if (status != 201) throw ({ ...data, status });
				toast.success("Creado con éxito");
				navigate(0);
			})
			.catch(error => toast.error(error.message));
	}

	return (
		<div className="flex flex-col my-md">
			<form className="mt-sm my-md">
				<FormField
					label="Tipo de beneficio"
					value={type}
					placeholder={"Tipo de beneficio"}
					onChange={setType}
					type={inputType.text}
					disabled={false}
				/>
				<FormField
					label="Dinero por mes"
					value={quantity}
					placeholder={"Dinero por mes"}
					onChange={setQuantity}
					type={inputType.number}
					disabled={false}
				/>
				<div className="flex mt-md justify-end">
					<button
						onClick={(event) => createBenefit(event)}
						className='hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm bg-green-800 hover:bg-green-600'
					>
						<img src={save} className="w-md "></img>
					</button>
					<button
						onClick={(event) => {event.preventDefault(); setNewBenefit(false); setVisible(false)}}
						className='ml-xsm hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm bg-red-800 hover:bg-red-600'
					>
						<img src={cancel} className="w-md "></img>
					</button>
				</div>
			</form>
		</div>
	)
}
