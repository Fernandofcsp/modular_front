import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../api";
//import { userStore } from "../../../store/userStore";
import { FormField, inputType } from "../moleculs/FormField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateUserFields } from "../helpers/validateUserFields";
import { CancelButton, SaveButton } from "../../../ui/moleculs";

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
			toast.success("Creación de usuario exitoso", {
				position: toast.POSITION.TOP_RIGHT,
				className: "mt-3xl",
			});
			break;
	}
};
export const CreateUserForm = () => {
	const navigate = useNavigate();
	//const token = userStore((state) => state.token);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [role, setRole] = useState("");

	const handleReset = () => {
		setName("");
		setEmail("");
		setPassword("");
		setPassword2("");
		setRole("");
	};

	const saveUser = async () => {
		const errors = validateUserFields(name, email, role, password, password2);

		if(errors.length > 0){
			errors.map(error => toast.error(error));
			return;
		}

		const data = {
			username: name,
			email: email,
			password: password,
			role: role,
		};

		axios.post(
			`${apiUrl}/users/signup/`,
			data,
			{ validateStatus: (status: number) => status < 500 }
		)
			.then(({ data, status }) => {
				if (status != 201) throw ({ ...data, status });
				toast.success(data.message);
				handleReset();
			})
			.catch(error => toast.error(error.message));
	};
	return (
		<form className="w-9/12 mt-sm">
			<div className="flex flex-row -mx-sm mb-md">
				<FormField
					label="Nombre"
					value={name}
					placeholder={"Nombre completo"}
					onChange={setName}
					type={inputType.text}
				/>
				<FormField
					label="Correo"
					value={email}
					placeholder="Correo electrónico"
					onChange={setEmail}
					type={inputType.email}
				/>
			</div>
			<div className="flex flex-row -mx-sm mb-md">
				<FormField
					label="Contraseña"
					value={password}
					placeholder="Contraseña"
					onChange={setPassword}
					type={inputType.password}
				/>
				<FormField
					label="Confirmar contraseña"
					value={password2}
					placeholder="Repite la contraseña"
					onChange={setPassword2}
					type={inputType.password}
				/>
			</div>
			<div className="flex flex-row -mx-sm mb-md">
				<div className="flex flex-col items-start px-sm w-1/2 mb-sm md:mb-0">
					<label className="block mb-sm text-xl capitalize text-gray-900">
						Rol de usuario
					</label>
					<select
						disabled={false}
						onChange={({ target }) => setRole(target.value)}
						value={role}
						className="focus:bg-white bg-gray-50 text-gray-800 text-lg rounded-md block w-full p-sm"
					>
						<option value="write">Escritura</option>
						<option value="read">Sólo lectura</option>
						<option value="admin">Administrador</option>
					</select>
				</div>
			</div>
			<div className="flex justify-end space-x-sm">
				<CancelButton title="Cancelar" onClick={() => navigate("/users")}/>
				<SaveButton title="Guardar" onClick={() => saveUser()} />
			</div>
			<ToastContainer />
		</form>
	);
};
