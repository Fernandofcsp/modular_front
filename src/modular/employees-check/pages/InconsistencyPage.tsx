import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../ui/layout/Layout";
import { inputType } from "../../users/moleculs";
import { FormField, InconsistenciesSelector } from "../moleculs";
import { useEffect, useState } from "react";
import axios from "axios";
import back from "../../../../public/assets/icons/back.png";
import { apiUrl } from "../../../api";
//import { userStore } from "../../../store/userStore";
import { validateCheckFields } from "../helpers/validateCheckFields";
import { ToastContainer, toast } from "react-toastify";
import { CancelButton, EditButton, NavigateButton, SaveButton } from "../../../ui/moleculs";
import { IInconsistency } from "../interfaces/interfaces";
import moment from "moment";

const initialState: IInconsistency = {
	id: 0,
	type: "",
	initial_date: "",
	final_date: "",
	minutes: 0,
};

export const InconsistencyPage = () => {
	const { id } = useParams();
	//const token = userStore((state) => state.token);
	const navigate = useNavigate();

	const [edit, setEdit] = useState(false);
	const [inconsistency, setInconsistency] = useState<IInconsistency>(initialState);
	const [type, setType] = useState(initialState.type);
	const [initialDate, setInitialDate] = useState(initialState.initial_date);
	const [finalDate, setFinalDate] = useState(initialState.final_date);
	const [minutes, setMinutes] = useState(initialState.minutes);

	//Colocar Función para cargar los datos de la inconsistencia
	useEffect(() => {
		getInconsistency();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getInconsistency = () => {
		axios.get(
			`${apiUrl}/inconcistences/${id}`,
			{ validateStatus: (status) => status < 500 }
		)
			.then(({ data, status }) => {
				if (status != 200) throw ({ ...data, status });
				setInconsistency({ ...data, initial_date: moment(data.initial_date, "DD/MM/YYYY").format("YYYY-MM-DD"), final_date: moment(data.final_date, "DD/MM/YYYY").format("YYYY-MM-DD") });
				setType(data.type);
				setMinutes(data.minutes);
				setInitialDate(moment(data.initial_date, "DD/MM/YYYY").format("YYYY-MM-DD"));
				setFinalDate(moment(data.final_date, "DD/MM/YYYY").format("YYYY-MM-DD"));
			})
			.catch(error => toast.error(error.message + " " + error.status));
	};

	const handleReset = () => {
		setEdit(false);
		setType(inconsistency.type);
		setMinutes(inconsistency.minutes);
		setInitialDate(inconsistency.initial_date);
		setFinalDate(inconsistency.final_date);
	};

	const updateInconsistency = async () => {
		const validate = validateCheckFields(
			type,
			initialDate,
			minutes,
			finalDate
		);

		const { errors, reset } = validate;

		if (errors.length > 0) {
			errors.map(error => toast.error(error));

			if (reset) {
				setMinutes(0);
			}
			return;
		}

		const data = {
			id: id,
			type: inconsistency,
			initial_date: moment(initialDate, "YYYY/MM/DD").format("DD/MM/YYYY"),
			final_date: type === "Falta" || type === "Retardo" ? moment(initialDate, "YYYY/MM/DD").format("DD/MM/YYYY") : moment(finalDate, "YYYY/MM/DD").format("DD/MM/YYYY"),
			minutes: type === "Retardo" ? +minutes : 0
		};

		console.log(data);

		axios.patch(
			`${apiUrl}/inconcistences/${id}`,
			data,
			{ validateStatus: (status: number) => status < 500 }
		)
			.then(({ data, status }) => {
				if (status != 201) throw ({ ...data, status });
				toast.success("Actualizado con éxito");
			})
			.catch(error => toast.error(error.message));
	};

	return (
		<Layout>
			<form className="w-9/12 mt-sm space-y-sm">
				<InconsistenciesSelector
					disabled={!edit}
					inconsistency={type}
					setInconsistency={setType}
				/>
				<FormField
					label={type === "Falta" || type === "Retardo" ? "Fecha" : "Fecha de inicio"}
					placeholder={
						type === "Falta" || type === "Retardo" ? "Fecha" : "Fecha de inicio"
					}
					type={inputType.date}
					onChange={setInitialDate}
					value={initialDate}
					disabled={!edit}
				/>
				{type === "Vacaciones" && (
					<FormField
						label="Fecha final"
						placeholder="Fecha final"
						type={inputType.date}
						onChange={setFinalDate}
						value={finalDate}
						disabled={!edit}
					/>
				)}
				{type === "Incapacidad" && (
					<FormField
						label="Fecha final"
						placeholder="Fecha final"
						type={inputType.date}
						onChange={setFinalDate}
						value={finalDate}
						disabled={!edit}
					/>
				)}
				{type === "Retardo" && (
					<FormField
						label="Minutos de retraso"
						placeholder="Minutos de retraso"
						type={inputType.text}
						onChange={setMinutes}
						value={minutes}
						disabled={!edit}
					/>
				)}
				<div className="flex justify-end space-x-sm">
					{
						edit ? <CancelButton title="Cancelar" onClick={() => handleReset()} />
							: <NavigateButton image={back} title="Volver" onClick={() => { navigate("/employees-check") }} />
					}
					{
						edit ? <SaveButton title="Guardar" onClick={() => updateInconsistency()} />
							: <EditButton title="Editar" onClick={() => setEdit(true)} />
					}
				</div>
				<ToastContainer />
			</form>
		</Layout>
	);
};
