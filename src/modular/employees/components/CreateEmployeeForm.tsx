import { useNavigate } from "react-router-dom";
import { FormField, inputType } from "../../users/moleculs";
import { userStore } from "../../../store/userStore";
import { useState } from 'react';
import { apiUrl } from "../../../api";
import axios from 'axios';
import cancel from "../../../../public/assets/icons/cancel.png";
import save from "../../../../public/assets/icons/salvar.png";

export const CreateEmployeeForm = () => {
	const navigate = useNavigate();
	const token = userStore((state) => state.token);

	const [firstName, setFirstName] = useState("");
	const [lastName1, setLastName1] = useState("");
	const [lastName2, setLastName2] = useState("");
	const [dailySalary, setDailySalary] = useState("");
	const [admissionDate, setAdmissionDate] = useState("");

	const saveEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Submiting");
		const data = JSON.stringify({
			first_name: firstName,
			last_name1: lastName1,
			last_name2: lastName2,
			daily_salary: parseInt(dailySalary),
			admision_date:	admissionDate,
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
			const { data } = await axios.request(config);
			console.log(data);
			navigate("/employees");
		} catch (error) {
			console.log(error);
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
					className="bg-red-500 hover:bg-red-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm"
				>
					<span>Cancelar</span>
					<img src={cancel} className="w-md "></img>
				</button>
				<button
					type="submit"
					className="bg-green-500 hover:bg-green-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm"
				>
					<span>Guardar</span>
					<img src={save} className="w-md "></img>
				</button>
			</div>
		</form>
	);
}
