import { useEffect, useState } from "react";
import { FormField, inputType } from "../../users/moleculs";
import save from "../../../../public/assets/icons/salvar.png";
import cancel from "../../../../public/assets/icons/cancel.png";
import { validateBenefitFields } from "../helpers/validateBenefitFields";
import { toast } from "react-toastify";

interface IBenefitsForm {
	idEmployee: number, 
	newBenefit: boolean,
	setVisible: (value: boolean) => void,
	handleReset: () => void,
	idBenefit?: number,
	benefitType?: string,
	benefitQuantity?: number
}



export const BenefitForm = (props: IBenefitsForm) => {
	const { idEmployee, setVisible, handleReset, newBenefit, idBenefit = 0, benefitQuantity = 0, benefitType = "" } = props;

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

		alert("Creado para el id de empleado " + idEmployee);
		//Colocar peticion http para eliminar el beneficio
	}

	const updateBenefit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();

		const errors = validateBenefitFields(type, quantity);

		if (errors.length > 0) {
			errors.map(error => toast.error(error));
			return;
		}

		if (confirm("¿Está seguro que desea actualizar el beneficio?")) {
			alert("Actualizado ")
			//Colocar peticion http para eliminar el beneficio
		}
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
						onClick={(event) => { newBenefit ? createBenefit(event) : updateBenefit(event)}}
						className='hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm bg-green-800 hover:bg-green-600'
					>
						<img src={save} className="w-md "></img>
					</button>
					<button
						onClick={(event) => {event.preventDefault(); setVisible(false); handleReset()}}
						className='ml-xsm hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm bg-red-800 hover:bg-red-600'
					>
						<img src={cancel} className="w-md "></img>
					</button>
				</div>
			</form>
		</div>
	)
}
