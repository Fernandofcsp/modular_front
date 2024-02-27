import { useNavigate } from "react-router-dom";
import { FormField, inputType } from "../../users/moleculs";
//import { userStore } from "../../../store/userStore";
import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../../api";
import { ToastContainer, toast } from "react-toastify";
import { validateEmployeeFields } from "../helpers/validateEmployeeFields";
import { CancelButton, SaveButton } from "../../../ui/moleculs";
import moment from "moment";

const notify = (type: string) => {
	switch (type) {
		case "WARN":
			toast.error("Datos incompletos o incorrectos", {
				position: toast.POSITION.TOP_RIGHT,
				className: "mt-3xl",
			});
			break;
		case "ERROR":
			toast.error(
				"Error en el sistema, intentelo mas tarde, si el problema persiste, consulte a soporte.",
				{ position: toast.POSITION.TOP_RIGHT, className: "mt-3xl" }
			);
			break;
		case "SUCCESS":
			toast.success("Creación de empleado exitoso", {
				position: toast.POSITION.TOP_RIGHT,
				className: "mt-3xl",
			});
			break;
		case "INVALIDDATE":
			toast.error("La fecha no debe ser mayor a la actual", {
				position: toast.POSITION.TOP_RIGHT,
				className: "mt-3xl",
			});
			break;
	}
};
export const CreateEmployeeForm = () => {
	const navigate = useNavigate();
	//const token = userStore((state) => state.token);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [position, setPosition] = useState("");
	const [dailySalary, setDailySalary] = useState(0);
	const [admissionDate, setAdmissionDate] = useState("");

	const handleReset = () => {
		setFirstName("");
		setLastName("");
		setPosition("");
		setDailySalary(0);
		setAdmissionDate("");
	};


	const saveEmployee = async () => {
		const errors = validateEmployeeFields(firstName, lastName, dailySalary, admissionDate);

		if (errors.length > 0) {
			errors.map(error => toast.error(error));
			return;
		}

		const data = {
			first_name: firstName,
			last_name: lastName,
			daily_salary: dailySalary,
			position_name: position,
			admision_date: moment(admissionDate).format("DD/MM/YYYY"),
		};

		axios.post(
			`${apiUrl}/employees/`,
			data,
			{ validateStatus: (status: number) => status < 500 }
		)
			.then(({ data, status }) => {
				if (status != 201) throw ({ ...data, status });
				toast.success("Creado con éxito");
				handleReset();
			})
			.catch(error => toast.error(error.message));

	};

	return (
		<form className="w-9/12 mt-sm">
			<div className="flex flex-row -mx-sm mb-md">
				<FormField
					label="Nombre"
					value={firstName}
					placeholder={"Nombre"}
					onChange={setFirstName}
					type={inputType.text}
				/>
				<FormField
					label="Apellidos"
					value={lastName}
					placeholder="Apellidos"
					onChange={setLastName}
					type={inputType.text}
				/>
			</div>
			<div className="flex flex-row -mx-sm mb-md">
				<FormField
					label="Puesto"
					value={position}
					placeholder="Puesto"
					onChange={setPosition}
					type={inputType.text}
				/>
				<FormField
					label="Salario diario"
					value={dailySalary}
					placeholder="Salario"
					onChange={setDailySalary}
					type={inputType.number}
				/>
				<FormField
					label="Fecha de admisión"
					value={admissionDate}
					placeholder="Fecha de admisión"
					onChange={setAdmissionDate}
					type={inputType.date}
				/>
			</div>
			<div className="flex justify-end space-x-sm">
				<CancelButton title="Cancelar" onClick={() => navigate("/employees")} />
				<SaveButton title="Guardar" onClick={() => saveEmployee()} />
			</div>
			<ToastContainer />
		</form>
	);
};
