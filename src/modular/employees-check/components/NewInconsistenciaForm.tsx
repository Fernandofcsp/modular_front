import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { FormButtons, FormField, InconsistenciesSelector } from "../moleculs";
import { inputType } from "../../users/moleculs";
import { validateCheckFields } from "../helpers/validateCheckFields";
import { INewInconsistency } from ".";
import { apiUrl } from "../../../api";
//import { userStore } from "../../../store/userStore";

export const NewInconsistenciaForm = ({ idEmployee, setShow }: INewInconsistency) => {
	//const token = userStore(state => state.token);

	const save = () => {
		const { errors, reset } = validateCheckFields(inconsistency, initialDate, minutes, endDate);

		if (errors.length > 0) {
			errors.map(error => toast.error(error));

			if (reset) {
				setInitialDate("");
				setEndDate("");
				setDifference(0);
			}
			return;
		}

		const data = {
			employee: idEmployee,
			type: inconsistency,
			initial_date: moment(initialDate, "YYYY/MM/DD").format("DD/MM/YYYY"),
			final_date: (inconsistency == "Falta" || inconsistency == "Retardo") ? moment(initialDate, "YYYY/MM/DD").format("DD/MM/YYYY") : moment(endDate, "YYYY/MM/DD").format("DD/MM/YYYY"),
			minutes: inconsistency === "Retardo" ? +minutes : 0
		};


		axios.post(
			`${apiUrl}/inconcistences/`,
			data,
			{ validateStatus: (status: number) => status < 500 }
		)
			.then(({ data, status }) => {
				if (status != 201) throw ({ ...data, status });
				toast.success("Creado con éxito");
				setInconsistency("Seleccione")
				setInitialDate("");
				setEndDate("");
				setDifference(0);
			})
			.catch(error => toast.error(error.message));
	}

	const cancel = () => {
		setShow(false);
		setInconsistency("")
		setInitialDate("");
		setEndDate("");
		setDifference(0);
	}

	const [inconsistency, setInconsistency] = useState("Seleccione");
	const [initialDate, setInitialDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [difference, setDifference] = useState(0);
	const [minutes, setMinutes] = useState(0);


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
			<form onSubmit={save} className="w-2/4 mt-md space-y-sm">
				<p className="text-headerTitle text-left pb-md">Nueva inconsistencia</p>
				<InconsistenciesSelector inconsistency={inconsistency} setInconsistency={setInconsistency} />
				{
					inconsistency !== "Seleccione" ?
						inconsistency === "Falta" ?
							<FormField label={"Fecha de falta"} onChange={setInitialDate} value={initialDate} placeholder="" type={inputType.date} />
							:
							<>
								<FormField label={inconsistency === "Retardo" ? "Fecha" : "Fecha de inicio"} onChange={setInitialDate} value={initialDate} placeholder="" type={inputType.date} />
								{
									inconsistency === "Retardo" ?
										<FormField label={"Tiempo en minutos"} onChange={setMinutes} value={minutes} placeholder="" type={inputType.number} />
										:
										<>
											<FormField label={inconsistency === "Retardo" ? "Día y hora de llegada" : "Fecha de regreso"} onChange={setEndDate} value={endDate} placeholder="" type={inconsistency === "Retardo" ? inputType.dateTime : inputType.date} />
											<FormField disabled={true} label={"Diferencia"} onChange={setDifference} value={difference} placeholder="" type={inputType.number} />
										</>
								}
							</>
						: ""
				}
				{
					<FormButtons cancel={cancel} save={save} />
				}
				<ToastContainer />
			</form>
		</div>
	)
}
