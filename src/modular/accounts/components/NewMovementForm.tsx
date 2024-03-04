import { useState } from "react";
import { FormField } from "../../employees-check/moleculs";
import { inputType } from "../../users/moleculs";
import { validateAccountFields } from "../helpers/ValidateFields";
import { apiUrl } from "../../../api";
//import { userStore } from "../../../store/userStore";
import axios from "axios";
import { CancelButton, SaveButton } from "../../../ui/moleculs";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";


interface INewMovementForm {
	idAccount: number,
	show: boolean,
	setShow: (show: boolean) => void,
}

export const NewMovementForm = (props: INewMovementForm) => {
	const { idAccount, setShow } = props;
	//const token = userStore((state) => state.token);
	const [concept, setConcept] = useState("");
	const [reference, setReference] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [date, setDate] = useState("");

	const handleReset = () => {
		setConcept("");
		setReference("");
		setQuantity(0);
		setDate("")
	}

	const saveAccount = async () => {
		const result = validateAccountFields(concept, reference, quantity, date);

		if (result.length > 0) {
			result.map(error => toast.error(error));
			return;
		} else {
			const data = {
				account: idAccount,
				concept: concept,
				reference: reference,
				amount: quantity,
				date: moment(date, "YYYY-MM-DD").format("DD/MM/YYYY")
			};

			axios.post(
				`${apiUrl}/movements/`,
				data,
				{ validateStatus: (status: number) => status < 500 }
			)
				.then(({ data, status }) => {
					if (status != 201) throw ({ ...data, status });
					console.log(data);
					toast.success("Creado con éxito");
					handleReset();
				})
				.catch(error => toast.error(error.message));
		}
	};

	return (
		<form className="w-10/12 mt-sm space-y-md">
			<h3 className="text-lg mb-xl">Nuevo movimiento</h3>
			<div className="flex flex-row space-x-sm">
				<FormField
					label="Concepto"
					value={concept}
					placeholder={"Concepto de la cuenta"}
					onChange={setConcept}
					type={inputType.text}
				/>
				<FormField
					label="Referencia"
					value={reference}
					placeholder={"Referencia bancaria"}
					onChange={setReference}
					type={inputType.text}
				/>
			</div>
			<div className="flex flex-row space-x-sm">
				<FormField
					label="Cantidad"
					value={quantity}
					placeholder="Cantidad de la cuenta"
					onChange={setQuantity}
					type={inputType.number}
				/>
				<FormField
					label="Fecha del movimiento"
					value={date}
					placeholder="Fecha del movimiento"
					onChange={setDate}
					type={inputType.date}
				/>
			</div>
			<div className="flex justify-end space-x-sm">
				<CancelButton onClick={() => {handleReset(); setShow(false)}} title="Cerrar" />
				<SaveButton title="Guardar" onClick={() => saveAccount()} />
			</div>
			<ToastContainer />
		</form>
	);
};
