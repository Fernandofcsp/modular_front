import { useParams } from "react-router-dom";
import Layout from "../../../ui/layout/Layout";
import { useEffect, useState } from "react";
//import { userStore } from "../../../store/userStore";
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
import { IEmployee } from "../components";
import moment from "moment";
import { IBenefit } from "../interfaces/EmployeeInterfaces";

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
	const { id } = useParams();
	const navigate = useNavigate();
	//const token = userStore((state) => state.token);

	const [initialState, setInitialState] = useState<IEmployee>({
		id: 0,
		admision_date: "",
		position_name: "",
		created_at: "",
		created_by: 0,
		daily_salary: 0,
		first_name: "",
		last_name: "",
		is_active: false,
		updated_at: "",
		updated_by: 0
	});

	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [position, setPosition] = useState("");
	const [dailySalary, setDailySalary] = useState(0);
	const [admisionDate, setAdmisionDate] = useState("");
	const [status, setStatus] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);
	const [benefits, setBenefits] = useState<IBenefit[]>([]);

	useEffect(() => {
		getEmployee();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	

	const getEmployee = () => {
		axios.get(
			`${apiUrl}/benefits/get-by-employee?employee=${id}`,
			{ validateStatus: (status) => status < 500 }
		)
			.then(({ data, status }) => {
				if (status != 200) throw ({ ...data, status });
				const { employee, benefits } = data;
				setBenefits(benefits);
				setInitialState(employee);
				setName(employee.first_name);
				setLastName(employee.last_name);
				setPosition(employee.position_name);
				setDailySalary(employee.daily_salary);
				setAdmisionDate(moment(employee.admision_date, "DD/MM/YYYY").format("YYYY-MM-DD"));
				setStatus(employee.is_active);
			})
			.catch(error => toast.error(error.message + " " + error.status));
	}

	const handleReset = () => {
		setIsDisabled(true);
		setName(initialState.first_name);
		setLastName(initialState.last_name);
		setDailySalary(initialState.daily_salary);
		setAdmisionDate(moment(initialState.admision_date, "DD/MM/YYYY").format("YYYY-MM-DD"));
	};

	const saveEmployeeData = () => {
		const errors = validateEmployeeFields(name, lastName, dailySalary, admisionDate);

		if (errors.length > 0) {
			errors.map(error => toast.error(error));
			return;
		}

		// const data = {
		// 	first_name: name,
		// 	last_name: lastName,
		// 	daily_salary: +dailySalary,
		// 	position_name: position,
		// 	admision_date: admisionDate,
		// 	is_active: Boolean(status),
		// };
		const data = {
			"first_name": name,
			"last_name": lastName,
			"daily_salary": +dailySalary,
			"admision_date": moment(admisionDate).format("DD/MM/YYYY"),
			"position_name": position,
			"is_active": true
		};


		axios.patch(
			`${apiUrl}/employees/${id}/`,
			data,
			{ validateStatus: (status: number) => status < 500 }
		)
			.then(({ data, status }) => {
				if (status != 200) throw ({ ...data, status });
				toast.success("Actualizado exitoso");
				setIsDisabled(true);
			})
			.catch(error => toast.error(error.message));
	};

	return (
		<Layout>
			<div className="w-11/12">
				<h3 className="text-headerTitle mb-xl">
					Información del empleado: <span className="text-blueLetter">{`${initialState.first_name} ${initialState.last_name}`}</span>
				</h3>
				<EmployeeInformation
					created_date={initialState.created_at}
					created_user_id={initialState.created_by}
					updated_date={initialState.updated_at}
				/>
				<form className="mt-sm">
					<div className="flex w-full space-x-3xl mb-lg">
						<div className="flex-1">
							<div className="flex flex-row -mx-sm mb-md">
								<FormField
									label="Nombre"
									value={name}
									placeholder={initialState.first_name}
									onChange={setName}
									type={inputType.text}
									disabled={isDisabled}
								/>
								<FormField
									label="Apellidos"
									value={lastName}
									placeholder={initialState.last_name}
									onChange={setLastName}
									type={inputType.text}
									disabled={isDisabled}
								/>
							</div>
							<div className="flex flex-row -mx-sm mb-md">
								<FormField
									label="Puesto"
									value={position}
									placeholder={initialState.position_name}
									onChange={setPosition}
									type={inputType.text}
									disabled={isDisabled}
								/>
								<FormField
									label="Salario diario"
									value={dailySalary}
									placeholder="Salario diario"
									onChange={setDailySalary}
									disabled={isDisabled}
									type={inputType.number}
								/>
							</div>
							<div className="flex flex-row -mx-sm mb-md">
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
										value={status ? 1 : 0}
										onChange={({ target }) => setStatus(!!parseInt(target.value))}
										className="block w-full bg-gray-50 text-gray-800 text-lg border rounded-md py-sm px-md mb-xsm leading-tight focus:outline-none focus:bg-white"
									>
										<option value={1}>ACTIVO</option>
										<option value={0}>INACTIVO</option>
									</select>
								</div>
							</div>
						</div>
						<BenefitsTable employeeId={initialState.id} benefits={benefits.filter(benefit => benefit.is_active === true)} isDisabled={isDisabled} />
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
