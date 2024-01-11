import { useParams } from "react-router-dom";
import Layout from "../../../ui/layout/Layout";
import axios from "axios";
import { apiUrl } from "../../../api";
import { useState } from "react";
import { userStore } from "../../../store/userStore";
import cancel from "../../../../public/assets/icons/cancel.png";
import save from "../../../../public/assets/icons/salvar.png";
import edit from "../../../../public/assets/icons/editar.png";
import { FormField, inputType } from "../../users/moleculs";


export const AccountPage = () => {
	const { id } = useParams();
	const [employee, setEmployee] = useState({
		firstName: "",
		lastName: "",
		dailySalary: "",
		job: "",
	});
	const token = userStore((state) => state.token);

	const [newFirstName, setNewFirstName] = useState(employee.firstName);
	const [newLastName, setNewLastName] = useState(employee.lastName);
	const [newDailySalary, setNewDailySalary] = useState(employee.dailySalary);
	const [newJob, setNewJob] = useState(employee.job);
	const [isDisabled, setDisabled] = useState(true);

	const handleReset = () => {
		setNewFirstName("");
		setNewDailySalary("");
		setNewLastName("");
		setNewJob("");
		setDisabled(true);
	};

	const getUser = async () => {
		try {
			const { data } = await axios.get(`${apiUrl}/employees/${id}`);
			console.log(data);
			setEmployee(data);
		} catch (error) {
			console.log(error);
		}
	};

	// useEffect(() => {
	// 	getUser();
	// }, []);

	const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		return;
		fetch(`${apiUrl}/employees/update/${id}`, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			method: "PATCH",

			// Fields that to be updated are passed
			body: JSON.stringify({
				firstName: newFirstName,
				lastName: newLastName,
				dailySalary: newDailySalary,
				job: newJob,
			}),
		})
			.then(function (response) {
				// console.log(response);
				return response.json();
			})
			.then(function (data) {
				console.log(data);
			});
	};

	return (
		<Layout>
			<form onSubmit={(event) => updateUser(event)} className="w-9/12 mt-sm">
				<h3 className="text-titleMd mb-xl uppercase">información del empleado</h3>
				<div className="flex flex-row -mx-sm mb-md">
					<FormField
						label="Nombre"
						value={newFirstName}
						placeholder={employee.firstName}
						onChange={setNewFirstName}
						type={inputType.text}
						disabled={isDisabled}
					/>
					<FormField
						label="Apellidos"
						value={newLastName}
						placeholder={employee.lastName}
						onChange={setNewLastName}
						type={inputType.text}
						disabled={isDisabled}
					/>
				</div>
				<div className="flex flex-row -mx-sm mb-md">
					<FormField
						label="Salario diario"
						value={""}
						placeholder="Salario diario"
						onChange={setNewDailySalary}
						disabled={isDisabled}
						type={inputType.number}
					/>
					<FormField
						label="Trabajo"
						value={""}
						placeholder="Tipo de puesto"
						onChange={setNewJob}
						disabled={isDisabled}
						type={inputType.text}
					/>
				</div>
				<div className="flex justify-end space-x-sm">
					<button
						type="button"
						onClick={() => handleReset()}
						className={`bg-red-500 hover:bg-red-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md 
            flex items-center gap-sm ${isDisabled && "hidden"}`}
					>
						<span>Cancelar</span>
						<img src={cancel} className="w-md "></img>
					</button>
					<button
						type={isDisabled ? "submit" : "button"}
						onClick={() => setDisabled((value) => !value)}
						className="bg-green-500 hover:bg-green-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm"
					>
						<span>{!isDisabled ? "Guardar" : "Editar"}</span>
						<img src={!isDisabled ? save : edit} className="w-md "></img>
					</button>
				</div>
			</form>
		</Layout>
	);
};
