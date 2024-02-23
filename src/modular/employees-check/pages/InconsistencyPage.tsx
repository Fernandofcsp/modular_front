import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../ui/layout/Layout";
import { inputType } from "../../users/moleculs";
import { FormField, InconsistenciesSelector } from "../moleculs";
import { useEffect, useState } from "react";
import cancel from "../../../../public/assets/icons/cancel.png";
import back from "../../../../public/assets/icons/back.png";
import { apiUrl } from "../../../api";
import { userStore } from "../../../store/userStore";
import { validateCheckFields } from "../helpers/validateCheckFields";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { CancelButton, EditButton, NavigateButton, SaveButton } from "../../../ui/moleculs";

interface IInconsistency {
	tipo: number;
	minutes: number;
	fechaInicio: string;
	fechaFin: string;
}

const initialState: IInconsistency = {
	tipo: 1,
	fechaInicio: "2024-01-21",
	fechaFin: "2024-02-02",
	minutes: 0,
};

export const InconsistencyPage = () => {
	const token = userStore((state) => state.token);
	const navigate = useNavigate();
	const { state } = useLocation();

	const [edit, setEdit] = useState(false);
	const [inconsistency, setInconsistency] = useState<IInconsistency>(initialState);
	const [newTipo, setNewTipo] = useState(initialState.tipo);
	const [newFechaInicio, setNewFechaInicio] = useState(initialState.fechaInicio);
	const [newFechaFin, setNewFechaFin] = useState(initialState.fechaFin);
	const [newMinutes, setNewMinutes] = useState(initialState.minutes);

	//Colocar Función para cargar los datos de la inconsistencia
	/*useEffect(() => {
		getInconsistency();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);*/

	const getInconsistency = async () => {
		try {
			//const { data } = await axios.request<IEmployeesResponse>(config);
			const { data } = await axios.get(`${apiUrl}/inconsistency`, {
				headers: {
					"Accept-Encoding": "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			setInconsistency(data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleReset = () => {
		setEdit(false);
		setNewTipo(inconsistency.tipo);
		setNewMinutes(inconsistency.minutes);
		setNewFechaInicio(inconsistency.fechaInicio);
		setNewFechaFin(inconsistency.fechaFin);
	};

	const updateInconsistency = async () => {
		const validate = validateCheckFields(
			newTipo,
			newFechaInicio,
			newMinutes,
			newFechaFin
		);
		const { errors, reset } = validate;

		if (errors.length > 0) {
			errors.map(error => toast.error(error));

			if (reset) {
				setNewMinutes(0);
			}
			return;
		}

		const data = JSON.stringify({
			id_inconsistencia: state.id,
			inconsistency_type: newTipo,
			end_date: newTipo === 1 ? null : newFechaFin,
			initial_date: newFechaFin,
			minutes: newMinutes,
		});

		const config = {
			method: "patch",
			url: `${apiUrl}/inconsistencies/update`,
			headers: {
				"Accept-Encoding": "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			data: data,
		};

		/*
		try {
			const { data } = await axios.request(config);
			console.log(data);
		} catch (error) {
			console.log(error);
		}*/
		console.log(config);
	};

	return (
		<Layout>
			<form className="w-9/12 mt-sm space-y-sm">
				<InconsistenciesSelector
					disabled={!edit}
					inconsistency={newTipo}
					setInconsistency={setNewTipo}
				/>
				<FormField
					label={newTipo === 0 || newTipo === 1 ? "Fecha" : "Fecha de inicio"}
					placeholder={
						newTipo === 0 || newTipo === 1 ? "Fecha" : "Fecha de inicio"
					}
					type={inputType.date}
					onChange={setNewFechaInicio}
					value={newFechaInicio}
					disabled={!edit}
				/>
				{newTipo === 2 && (
					<FormField
						label="Fecha final"
						placeholder="Fecha final"
						type={inputType.date}
						onChange={setNewFechaFin}
						value={newFechaFin}
						disabled={!edit}
					/>
				)}
				{newTipo === 3 && (
					<FormField
						label="Fecha final"
						placeholder="Fecha final"
						type={inputType.date}
						onChange={setNewFechaFin}
						value={newFechaFin}
						disabled={!edit}
					/>
				)}
				{newTipo === 1 && (
					<FormField
						label="Minutos de retraso"
						placeholder="Minutos de retraso"
						type={inputType.text}
						onChange={setNewMinutes}
						value={newMinutes}
						disabled={!edit}
					/>
				)}
				<div className="flex justify-end space-x-sm">
					{
						edit ? <CancelButton title="Cancelar" onClick={() => handleReset()} />
							: <NavigateButton title="Volver" onClick={() => { navigate("/employees-check") }} />
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
