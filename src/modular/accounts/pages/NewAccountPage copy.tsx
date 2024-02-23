import { useState } from "react";
import Layout from "../../../ui/layout/Layout";
import { FormField } from "../../employees-check/moleculs";
import { inputType } from "../../users/moleculs";
import { validateAccountFields } from "../helpers/ValidateFields";
import { apiUrl } from "../../../api";
import { userStore } from "../../../store/userStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavigateButton, SaveButton } from "../../../ui/moleculs";
import { ToastContainer, toast } from "react-toastify";
import back from "../../../../public/assets/icons/back.png";

export const notify = (type: any) => {
	switch (type) {
		case "WARN":
			toast.error(
				"Datos incompletos ",
				{
					position: toast.POSITION.TOP_RIGHT,
					className: "mt-3xl",
				}
			);
			break;
		case "ERROR":
			toast.error(
				"Error en el sistema, intentelo mas tarde, si el problema persiste, consulte a soporte.",
				{ position: toast.POSITION.TOP_RIGHT, className: "mt-3xl" }
			);
			break;
		case "SUCCESS":
			toast.success("Datos de cuenta actualizados", {
				position: toast.POSITION.TOP_RIGHT,
				className: "mt-3xl",
			});
			break;
	}
};
export const NewAccountPage = () => {
	const token = userStore((state) => state.token);
	const navigate = useNavigate();
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

	const saveAccount = async ( ) => {
		const result = validateAccountFields(concept, reference, quantity, date);

		if (result.length > 0) {
			result.map(error => toast.error(error));
			return;
		} else {
			const data = JSON.stringify({
				concept: concept,
				reference: reference,
				quantity: quantity,
				date: date,
			});

			const config = {
				method: "post",
				url: `${apiUrl}/account/create`,
				headers: {
					"Accept-Encoding": "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				data: data,
			};

			console.log(config);
			/*
			try {
			const { data, status } = await axios.request(config);
			console.log(data);
			if (status == 200) {
				notify("SUCCESS");
				handleReset();
			}
			} catch (error: any) {
			if (error.message == "Request failed with status code 400") {
				notify("WARN");
			} else {
				notify("ERROR");
			}
		  
		}*/
		}
	};

	return (
		<Layout>
			<form className="w-9/12 mt-sm space-y-sm">
				<h3 className="text-titleSm mb-xl uppercase">Crear nueva cuenta</h3>
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
						label="Fecha"
						value={date}
						placeholder="Fecha de cuenta"
						onChange={setDate}
						type={inputType.date}
					/>
				</div>
				<div className="flex justify-end space-x-sm">
					<NavigateButton image={back} title="Volver" onClick={() => navigate("/accounts")} />
					<SaveButton title="Guardar" onClick={() => saveAccount()} />
				</div>
				<ToastContainer />
			</form>
		</Layout>
	);
};
