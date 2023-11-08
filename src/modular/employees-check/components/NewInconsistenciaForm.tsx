import { useEffect, useState } from "react";
import { FormButtons, FormField, InconsistenciesSelector, TypeExitSelect } from "../moleculs";
import { inputType } from "../../users/moleculs";
import { validateFields } from "../helpers/validateFields";
import { INewInconsistency } from ".";
import moment from "moment";

export const NewInconsistenciaForm = ({ setShow } : INewInconsistency) => {

	const save = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const validate = validateFields(inconsistency, initialDate, endDate, typeExit);
		const { errors, reset } = validate;

		if(errors.length > 0){
			setAlert(errors);

			setTimeout(() => {
				setAlert([]);
			}, 5000);
			
			if(reset){
				setInitialDate("");
				setEndDate("");
				setDifference(0);
			}
			return;
		}

		console.log("Guardando...");
	}

	const cancel = (e: React.SyntheticEvent) => {
		e.preventDefault();
		setShow(false);
		setTypeExit(-1);
		setInconsistency(-1)
		setInitialDate("");
		setEndDate("");
		setDifference(0);
	}

	const [inconsistency, setInconsistency] = useState(-1);
	const [initialDate, setInitialDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [difference, setDifference] = useState(0);
	const [typeExit, setTypeExit] = useState(-1);
	const [typeDifference, setTypeDifference] = useState("");

	const [alert, setAlert] = useState<string[]>([]);

	useEffect(() => {
		if(inconsistency === -1)
			return;

		inconsistency === 1 ? setTypeDifference("Minutos") : setTypeDifference("Dias");
	}, [inconsistency])
	

	useEffect(() => {
		console.log("Aquí");
		if(initialDate === "" || endDate === "")
			return;
		typeDifference === "Minutos" ? 
			setDifference(moment(endDate).diff(moment(initialDate), "minutes"))
			: setDifference(moment(endDate).diff(moment(initialDate	), "days"))
	}, [initialDate, endDate, typeDifference])
	
	return (
		<div>
			<form onSubmit={save} className="w-9/12 mt-md space-y-sm mx-auto">
				<p className="text-titleMd font-bold text-center pb-md">Nueva inconsistencia</p>
				<InconsistenciesSelector inconsistency={ inconsistency } setInconsistency={ setInconsistency } />
				{
					inconsistency !== -1 ?
						inconsistency === 0 ?
							<FormField label={"Fecha de falta"} onChange={setInitialDate} value={initialDate} placeholder="" type={inputType.date} />
						:
							<>
								{
									inconsistency === 1 && <TypeExitSelect setTypeExit={ setTypeExit } typeExit={ typeExit }/>
								}
								<FormField label={inconsistency === 1 ? "Día y hora de entrada" : "Fecha de inicio"} onChange={setInitialDate} value={initialDate} placeholder="" type={inconsistency === 1 ? inputType.dateTime : inputType.date} />
								<FormField label={inconsistency === 1 ? "Día y hora de llegada" : "Fecha de regreso"} onChange={setEndDate} value={endDate} placeholder="" type={inconsistency === 1 ? inputType.dateTime : inputType.date} />
								<FormField disabled={true} label={"Diferencia - " + typeDifference} onChange={setDifference} value={difference} placeholder="" type={inputType.number} />
							</>
					: ""
				}
				{
					alert.length > 0 && 
						<div className="text-red-500">
							{
								alert.map(( error, i ) => <p className="text-end" key={ i }>{ error }</p>)
							}
						</div>
				}
				{
					inconsistency !== -1 &&
						<FormButtons cancel={ cancel } save={ save } />
				}
			</form>
		</div>
	)
}
