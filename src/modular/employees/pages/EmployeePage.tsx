import { useLocation } from "react-router-dom";
import Layout from "../../../ui/layout/Layout";
import { useState } from "react";
import { userStore } from "../../../store/userStore";
import { FormField, inputType } from "../../users/moleculs";
import { EmployeeInformation } from "../components/EmployeeInformation";
import axios from "axios";
import { apiUrl } from "../../../api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { validateEmployeeFields } from "../helpers/validateEmployeeFields";
import { BenefitsTable } from "../components/BenefitsTable";
import { CancelButton, EditButton, NavigateButton, SaveButton } from "../../../ui/moleculs";
import back from "../../../../public/assets/icons/back.png";

export const notify = (type: any) => {
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
			toast.success("Edición de empleado exitoso", {
				position: toast.POSITION.TOP_RIGHT,
				className: "mt-3xl",
			});
			break;
	}
};


export const EmployeePage = () => {
	const { state } = useLocation();

	const {
		employee_id,
		first_name,
		last_name1,
		last_name2,
		daily_salary,
		admision_date,
		status,
		created_date,
		updated_date,
		created_user_id,
		benefits
	} = state;

	const navigate = useNavigate();
	const [name, setName] = useState(first_name);
	const [lastName1, setLastName1] = useState(last_name1);
	const [lastName2, setLastName2] = useState(last_name2);
	const [dailySalary, setDailySalary] = useState(daily_salary);
	const [admisionDate, setAdmisionDate] = useState(admision_date);
	const [newStatus, setNewStatus] = useState(status);
	const token = userStore((state) => state.token);
	const [isDisabled, setIsDisabled] = useState(true);

	const handleReset = () => {
		setIsDisabled(true);
		setName(first_name);
		setLastName1(last_name1);
		setLastName2(lastName2);
		setDailySalary(daily_salary);
	};

	const saveEmployeeData = async () => {
		const errors = validateEmployeeFields(name, lastName1, lastName2, dailySalary, admisionDate);

		if (errors.length > 0) {
			errors.map(error => toast.error(error));
			return;
		}

		const data = JSON.stringify({
			first_name: name,
			last_name1: lastName1,
			last_name2: lastName2,
			daily_salary: parseInt(dailySalary),
			admision_date: admisionDate,
			status: newStatus,
		});

		const config = {
			method: "patch",
			url: `${apiUrl}/employees/update/${employee_id}`,
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
	};

	return (
		<Layout>
			<div className="w-11/12">
				<h3 className="text-headerTitle mb-xl">
					Información del empleado: {`${first_name} ${lastName1} ${lastName2}`}
				</h3>
				<EmployeeInformation
					created_date={created_date}
					created_user_id={created_user_id}
					updated_date={updated_date}
				/>
				<form className="mt-sm">
					<div className="flex w-full space-x-3xl mb-lg">
						<div className="flex-1">
							<div className="flex flex-row -mx-sm mb-md">
								<FormField
									label="Nombre"
									value={name}
									placeholder={first_name}
									onChange={setName}
									type={inputType.text}
									disabled={isDisabled}
								/>
								<FormField
									label="Primer apellido"
									value={lastName1}
									placeholder={last_name1}
									onChange={setLastName1}
									type={inputType.text}
									disabled={isDisabled}
								/>
								<FormField
									label="Segundo apellido"
									value={lastName2}
									placeholder={last_name2}
									onChange={setLastName2}
									type={inputType.text}
									disabled={isDisabled}
								/>
							</div>
							<div className="flex flex-row -mx-sm mb-md">
								<FormField
									label="Salario diario"
									value={dailySalary}
									placeholder="Salario diario"
									onChange={setDailySalary}
									disabled={isDisabled}
									type={inputType.number}
								/>
								<FormField
									label="Fecha de ingreso"
									value={admisionDate}
									placeholder="Fecha de ingreso"
									onChange={setAdmisionDate}
									disabled={isDisabled}
									type={inputType.date}
								/>
								<div className="flex flex-col items-start px-sm w-full mb-sm md:mb-0">
									<label className="block text-gray-900 text-lg tracking-wide mb-sm">
										ESTADO
									</label>
									<select
										disabled={isDisabled}
										value={newStatus}
										onChange={({ target }) => setNewStatus(target.value)}
										className="block w-full bg-gray-50 text-gray-800 text-lg border rounded-md py-sm px-md mb-xsm leading-tight focus:outline-none focus:bg-white"
									>
										<option value={1}>ACTIVO</option>
										<option value={0}>INACTIVO</option>
									</select>
								</div>
							</div>
						</div>
						<BenefitsTable idEmployee={employee_id} isDisabled={isDisabled} benefits={benefits} />
					</div>
					<div className="flex justify-end space-x-sm">
						{
							isDisabled ? (
								<>
									<NavigateButton onClick={() => navigate("/employees")} title="Volver" image={back} />
									<EditButton onClick={() => setIsDisabled(false)} title="Editar" />
								</>
							) : (
								<>
									<CancelButton onClick={() => handleReset()} title="Cancelar" />
									<SaveButton onClick={() => saveEmployeeData()} title="Guardar" />
								</>
							)
						}
					</div>
					<ToastContainer />
				</form>
			</div>
		</Layout>
	);
};
