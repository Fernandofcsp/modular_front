import { useNavigate } from "react-router-dom";
import { FormField, inputType } from "../../users/moleculs";
import { userStore } from "../../../store/userStore";
import { useState } from "react";
import { apiUrl } from "../../../api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import cancel from "../../../../public/assets/icons/cancel.png";
import save from "../../../../public/assets/icons/salvar.png";

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
	const token = userStore((state) => state.token);

	const [firstName, setFirstName] = useState("");
	const [lastName1, setLastName1] = useState("");
	const [lastName2, setLastName2] = useState("");
	const [dailySalary, setDailySalary] = useState("");
	const [admissionDate, setAdmissionDate] = useState("");

	const handleReset = () => {
		setFirstName("");
		setLastName1("");
		setLastName2("");
		setDailySalary("");
		setAdmissionDate("");
	};
	const validateDate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

	};

	const saveEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const todayDate = new Date().toISOString().slice(0, 10);
		if (admissionDate < todayDate) {
			const data = JSON.stringify({
				first_name: firstName,
				last_name1: lastName1,
				last_name2: lastName2,
				daily_salary: parseInt(dailySalary),
				admision_date: admissionDate,
			});

			const config = {
				method: "post",
				url: `${apiUrl}/employees/create`,
				headers: {
					"Accept-Encoding": "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				data: data,
			};

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
			}

		} else {

			notify("INVALIDDATE");
		}

	};

	return (
		<form onSubmit={(event) => saveEmployee(event)} className="w-9/12 mt-sm">
			<div className="flex flex-row -mx-sm mb-md">
				<FormField
					label="Nombre"
					value={firstName}
					placeholder={"Nombre"}
					onChange={setFirstName}
					type={inputType.text}
				/>
				<FormField
					label="Primer apellido"
					value={lastName1}
					placeholder="Primer apellido"
					onChange={setLastName1}
					type={inputType.text}
				/>
				<FormField
					label="Segundo apellido"
					value={lastName2}
					placeholder="Segundo apellido"
					onChange={setLastName2}
					type={inputType.text}
				/>
			</div>
			<div className="flex flex-row -mx-sm mb-md">
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
				<button
					onClick={() => navigate("/employees")}
					className="bg-red-800 hover:bg-red-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm"
				>
					<span>Cancelar</span>
					<img src={cancel} className="w-md "></img>
				</button>
				<button
					type="submit"
					className="bg-green-800 hover:bg-green-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm"
				>
					<span>Crear</span>
					<img src={save} className="w-md "></img>
				</button>
			</div>
			<ToastContainer />
		</form>
	);
};
