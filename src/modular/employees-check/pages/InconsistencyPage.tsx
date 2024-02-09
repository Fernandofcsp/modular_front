import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../ui/layout/Layout"
import { inputType } from "../../users/moleculs";
import { FormField, InconsistenciesSelector } from "../moleculs";
import { useEffect, useState } from "react";
import cancel from "../../../../public/assets/icons/cancel.png";
import save from "../../../../public/assets/icons/salvar.png";
import editImage from "../../../../public/assets/icons/editar.png";
import back from "../../../../public/assets/icons/back.png";
import { apiUrl } from "../../../api";
import { userStore } from "../../../store/userStore";
import { validateFields } from "../helpers/validateFields";
import axios from "axios";

interface IInconsistency {
	tipo : number,
	minutes : number,
	fechaInicio : Date,
	fechaFin : Date
}

const initialState : IInconsistency = {
	tipo: -1,
	fechaInicio: new Date(),
	fechaFin: new Date(),
	minutes: -1
}

export const InconsistencyPage = () => {
	const token = userStore(state => state.token);
	const navigate = useNavigate();
	const { state } = useLocation();


	const [alert, setAlert] = useState<string[]>([]);
	const [edit, setEdit] = useState(false);
	const [inconsistency, setInconsistency] = useState<IInconsistency>(initialState);
	const [newTipo, setNewTipo] = useState<number>(-1);
	const [newFechaInicio, setNewFechaInicio] = useState<Date>(new Date());
	const [newFechaFin, setNewFechaFin] = useState<Date>(new Date());
	const [newMinutes, setNewMinutes] = useState<number>(-1);
	
	//Colocar Función para cargar los datos de la inconsistencia
	useEffect(
		() => {
			getInconsistency()	
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []
	)

	const getInconsistency = async () => {
		try {
			//const { data } = await axios.request<IEmployeesResponse>(config);
			const { data } = await axios.get(`${apiUrl}/inconsistency`, {
				headers: {
					"Accept-Encoding": "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				}
			});
			setInconsistency(data);
			const year = inconsistency.fechaInicio.getFullYear();
			const month = ('0' + (inconsistency.fechaInicio.getMonth() + 1)).slice(-2);  // Agregar cero inicial si es necesario
			const day = ('0' + inconsistency.fechaInicio.getDate()).slice(-2);  // Agregar cero inicial si es necesario

			// Formatear la fecha como una cadena "YYYY-MM-DD"
			const formattedDate = year + '-' + month + '-' + day;
			let formattedDate2: any;

			if (inconsistency.tipo === 2 || inconsistency.tipo === 3) {
				const year = inconsistency.fechaFin.getFullYear();
				const month = ('0' + (inconsistency.fechaFin.getMonth() + 1)).slice(-2);  // Agregar cero inicial si es necesario
				const day = ('0' + inconsistency.fechaFin.getDate()).slice(-2);  // Agregar cero inicial si es necesario

				// Formatear la fecha como una cadena "YYYY-MM-DD"
				formattedDate2 = year + '-' + month + '-' + day;
			}
		} catch (error) {
			console.log(error);
		}
	}

	const handleReset = () => {
		setEdit(false);
		setNewTipo(inconsistency.tipo);
		setNewMinutes(inconsistency.minutes);
		setNewFechaInicio(inconsistency.fechaInicio);
		setNewFechaFin(inconsistency.fechaFin);
	}

	const updateInconsistency = async ( ) => {
		console.log(newTipo, newFechaFin, newMinutes, newFechaFin)
		const validate = validateFields(newTipo, newFechaFin, newMinutes, newFechaFin);
		const { errors, reset } = validate;

		if (errors.length > 0) {
			setAlert(errors);

			setTimeout(() => {
				setAlert([]);
			}, 5000);

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
					placeholder={newTipo === 0 || newTipo === 1 ? "Fecha" : "Fecha de inicio"}
					type={inputType.date}
					onChange={setNewFechaInicio}
					value={newFechaInicio}
					disabled={!edit}
				/>
				{
					newTipo === 2 &&
					<FormField
						label="Fecha final"
						placeholder="Fecha final"
						type={inputType.date}
						onChange={setNewFechaFin}
						value={newFechaFin}
						disabled={!edit}
					/>

				}
				{
					newTipo === 3 &&
					<FormField
						label="Fecha final"
						placeholder="Fecha final"
						type={inputType.date}
						onChange={setNewFechaFin}
						value={newFechaFin}
						disabled={!edit}
					/>

				}
				{
					newTipo === 1 &&
					<FormField
						label="Minutos de retraso"
						placeholder="Minutos de retraso"
						type={inputType.text}
						onChange={setNewMinutes}
						value={newMinutes}
						disabled={!edit}
					/>
				}
				{
					alert.length > 0 &&
					<div className="text-red-500">
						{
							alert.map((error, i) => <p className="text-end" key={i}>{error}</p>)
						}
					</div>
				}
				<div className="flex justify-end space-x-sm">
					{
						edit ?
							<button
								type="button"
								onClick={() => handleReset()}
								className={`bg-red-500 hover:bg-red-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md 
            flex items-center gap-sm ${!edit && "hidden"}`}
							>
								<span>Cancelar</span>
								<img src={cancel} className="w-md " />
							</button>
							:
							<button
								type={"button"}
								onClick={() => {
									navigate("/employees-check");
								}}
								className={`bg-blue-500 hover:bg-blue-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md 
									flex items-center gap-sm ${edit && "hidden"}`}
							>
								<span>Volver</span>
								<img src={back} className="w-md " />
							</button>
					}
					<button
						type="button"
						onClick={edit ? () => updateInconsistency() : () => {
							setEdit((value) => !value);
						}}
						className="bg-green-500 hover:bg-green-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm"
					>
						<span>{edit ? "Guardar" : "Editar"}</span>
						<img src={edit ? save : editImage} className="w-md " />
					</button>
				</div>
			</form>
		</Layout>
	)
};
