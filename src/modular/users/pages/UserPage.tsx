import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../ui/layout/Layout";
import axios from "axios";
import { apiUrl } from "../../../api";
import { useEffect, useState } from "react";
import { FormField, inputType } from "../moleculs";
import back from "../../../../public/assets/icons/back.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateUserFields } from "../helpers/validateUserFields";
import { CancelButton, EditButton, SaveButton } from "../../../ui/moleculs";
import { NavigateButton } from '../../../ui/moleculs/NavigateButton';

export const notify = (type: any) => {
	switch (type) {
		case "WARN":
			toast.error(
				"Las contraseñas no coinciden o no contienen mayusculas y/o caracteres especiales ",
				{
					position: toast.POSITION.TOP_RIGHT,
					className: "mt-3xl",
				}
			);
			break;
		case "ERROR":
			toast.error(
				"Error en el sistema, intentelo mas tarde, si el problema persiste, consulte a soporte.",
				{ position: toast.POSITION.TOP_RIGHT, className: "mt-3xl" }
			);
			break;
		case "SUCCESS":
			toast.success("Datos de usuario actualizados", {
				position: toast.POSITION.TOP_RIGHT,
				className: "mt-3xl",
			});
			break;
	}
};
export const UserPage = () => {

	const { id } = useParams();
	const [user, setUser] = useState({
		user_name: "",
		email: "",
		role: "",
	});
	//const token = userStore((state) => state.token);
	const navigate = useNavigate();
	const [newName, setNewName] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [rePassword, setrePassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [isDisabled, setDisabled] = useState(true);
	const [changePassword, setChangePassword] = useState(false);
	const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState(false); // Suponiendo que isActive se inicializa como false

  const handleSelectChange = (event : any) => {
    const selectedValue = event.target.value;
    setIsActive(selectedValue === 'true'); // Convertir el valor seleccionado a booleano y actualizar isActive
  };

	const getUser = async () => {
		await axios.get(
			`${apiUrl}/users/${id}`,
			{ validateStatus: (status) => status < 500 }
		)
			.then(({ data, status }) => {
				if (status != 200) throw ({ ...data, status });
				setUser(data);
				setNewName(data.user_name);
				setNewEmail(data.email);
				setRole(data.role);
        setIsActive(data.is_active);
			})
			.catch(error => toast.error(error.message + " " + error.status));
	};

	useEffect(() => {
		getUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleReset = () => {
		setNewName(`${user.user_name}`);
		setNewEmail(`${user.email}`);
		setrePassword("");
		setNewPassword("");
		setDisabled(true);
		setChangePassword(false);
	};

	const updateUser = () => {
		const errors = validateUserFields(newName, newEmail, role, newPassword, rePassword);

		if (errors.length > 0) {
			errors.map(error => toast.error(error));

			return;
		}

		const data = {
			user_name: newName,
			email: newEmail != user.email ? newEmail : undefined,
			password: changePassword ? newPassword : undefined,
			role: role,
      is_active: isActive,
		};

		axios.patch(
			`${apiUrl}/users/${id}/`,
			data,
			{ validateStatus: (status: number) => status < 500 }
		)
			.then(({ data, status }) => {
				if (status != 200 && status != 201) throw ({ ...data, status });
				toast.success(data.message);
				setDisabled(true);
			})
			.catch(error => toast.error(error.message + " " + error.status));
	};

	return (
		<Layout>
			<form className="w-9/12 mt-sm">
				<h3 className="text-headerTitle mb-xl">Información del usuario</h3>
				<div className="flex flex-row -mx-sm py-sm">
					<FormField
						label="Nombre"
						value={newName}
						placeholder={user.user_name}
						onChange={setNewName}
						type={inputType.text}
						disabled={isDisabled}
					/>
					<FormField
						label="Correo"
						value={newEmail}
						placeholder={user.email}
						onChange={setNewEmail}
						type={inputType.email}
						disabled={isDisabled}
					/>
				</div>

				{changePassword && (
					<div className="flex flex-row -mx-sm mb-md">
						<FormField
							label="Contraseña nueva"
							value={newPassword}
							placeholder=""
							onChange={setNewPassword}
							disabled={isDisabled}
							type={inputType.password}
						/>
						<FormField
							label="Repetir contraseña"
							value={rePassword}
							placeholder=""
							onChange={setrePassword}
							type={inputType.password}
							disabled={isDisabled}
						/>
					</div>
				)}

				<div className="flex flex-row -mx-sm mb-md">
					<div className="flex flex-col items-start px-sm w-1/2 mb-sm md:mb-0">
						<label className="">
							Rol de usuario
						</label>
						<select
							disabled={isDisabled}
							onChange={({ target }) => setRole(target.value)}
							value={role}
							className="focus:bg-white bg-gray-50 text-gray-800 text-lg rounded-md block w-full p-sm"
						>
							<option value="write">Escritura</option>
							<option value="read">Sólo lectura</option>
							<option value="admin">Administrador</option>
						</select>
					</div>
          <div className="flex flex-col items-start px-sm w-1/2 mb-sm md:mb-0">
						<label className="">
							Estado
						</label>
						<select
							disabled={isDisabled}
							onChange={handleSelectChange}
							value={isActive.toString()}
							className="focus:bg-white bg-gray-50 text-gray-800 text-lg rounded-md block w-full p-sm"
						>
							<option value="true">Activo</option>
							<option value="false">Inactivo</option>
							
						</select>
					</div>
          
				</div>
        
				<div className="flex justify-end space-x-sm">
					{
						isDisabled ? (
							<>
								<NavigateButton onClick={() => navigate("/users")} title="Volver" image={back} />
								<EditButton onClick={() => setDisabled(false)} title="Editar" />
							</>
						)
							: (
								<>
									<CancelButton onClick={() => handleReset()} title="Cancelar" />
									<SaveButton onClick={() => updateUser()} title="Guardar" />
								</>
							)
					}
				</div>
				<ToastContainer />
			</form>
		</Layout>
	);
};
