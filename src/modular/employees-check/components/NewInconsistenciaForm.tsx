import { useEffect, useState } from "react";
import { FormButtons, FormField, InconsistenciesSelector } from "../moleculs";
import { inputType } from "../../users/moleculs";
import { validateFields } from "../helpers/validateFields";
import { INewInconsistency } from ".";
import moment from "moment";
import { apiUrl } from "../../../api";
//import axios from "axios";
import { userStore } from "../../../store/userStore";

export const NewInconsistenciaForm = ({ setShow }: INewInconsistency) => {
	const token = userStore(state => state.token);

	const save = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		console.log(inconsistency);
		const validate = validateFields(inconsistency, initialDate, minutes, endDate);
		const { errors, reset } = validate;

		if (errors.length > 0) {
			setAlert(errors);

			setTimeout(() => {
				setAlert([]);
			}, 5000);

			if (reset) {
				setInitialDate("");
				setEndDate("");
				setDifference(0);
			}
			return;
		}

		//COLOCAR HTTP PARA REALIZAR LA INSERCIÓN DE LA INCONSISTENCIA EN LA BASE DE DATOS
		const data = JSON.stringify({
			inconsistency_type: inconsistency,
			initial_date: initialDate,
			end_date: inconsistency === 1 ? "" : endDate,
			minutes: minutes,
		});


		const config = {
			method: "post",
			url: `${apiUrl}/inconsistencies/create`,
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
	}

	const cancel = (e: React.SyntheticEvent) => {
		e.preventDefault();
		setShow(false);
		setInconsistency(-1)
		setInitialDate("");
		setEndDate("");
		setDifference(0);
	}

	const [inconsistency, setInconsistency] = useState(-1);
	const [initialDate, setInitialDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [difference, setDifference] = useState(0);
	const [minutes, setMinutes] = useState(0);

	const [alert, setAlert] = useState<string[]>([]);


	useEffect(() => {
		if (initialDate === "" || endDate === "")
			return;

		const from = moment(initialDate);
		const to = moment(endDate);
		let days = 0;
		while (!from.isAfter(to)) {
			// Si no es sabado ni domingo
			if (from.isoWeekday() !== 6 && from.isoWeekday() !== 7) {
				days++;
			}
			from.add(1, 'days');
		}
		setDifference(days);
	}, [initialDate, endDate])

	return (
		<div>
			<form onSubmit={save} className="w-3/4 mt-md space-y-sm">
				<p className="text-titleMd font-bold text-left pb-md">Nueva inconsistencia</p>
				<InconsistenciesSelector inconsistency={inconsistency} setInconsistency={setInconsistency} />
				{
					inconsistency !== -1 ?
						inconsistency === 0 ?
							<FormField label={"Fecha de falta"} onChange={setInitialDate} value={initialDate} placeholder="" type={inputType.date} />
							:
							<>
								<FormField label={inconsistency === 1 ? "Fecha" : "Fecha de inicio"} onChange={setInitialDate} value={initialDate} placeholder="" type={inputType.date} />
								{
									inconsistency === 1 ?
										<FormField label={"Tiempo en minutos"} onChange={setMinutes} value={minutes} placeholder="" type={inputType.number} />
										:
										<>
											<FormField label={inconsistency === 1 ? "Día y hora de llegada" : "Fecha de regreso"} onChange={setEndDate} value={endDate} placeholder="" type={inconsistency === 1 ? inputType.dateTime : inputType.date} />
											<FormField disabled={true} label={"Diferencia"} onChange={setDifference} value={difference} placeholder="" type={inputType.number} />
										</>
								}
							</>
						: ""
				}
				{
					alert.length > 0 &&
					<div className="text-red-500">
						{
							alert.map((error, i) => <p className="text-end" key={i}>{error}</p>)
						}
					</div>
				}
				{
					inconsistency !== -1 &&
					<FormButtons cancel={cancel} save={save} />
				}
			</form>
		</div>
	)
}
