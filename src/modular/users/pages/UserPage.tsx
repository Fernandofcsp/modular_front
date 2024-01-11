import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../ui/layout/Layout";
import axios from "axios";
import { apiUrl } from "../../../api";
import { useEffect, useState } from "react";
import { userStore } from "../../../store/userStore";
import { FormField, RoleSelector, inputType } from "../moleculs";
import cancel from "../../../../public/assets/icons/cancel.png";
import save from "../../../../public/assets/icons/salvar.png";
import edit from "../../../../public/assets/icons/editar.png";


export const UserPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [user, setUser] = useState({
		nickname: "",
		email: "",
		role: "",
	});
	const token = userStore((state) => state.token);

	const [newName, setNewName] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [role, setRole] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [newPassword1, setNewPassword1] = useState("");
	const [isDisabled, setDisabled] = useState(true);
	const [errors, setErrors] = useState([]);
	const [saved, setSaved] = useState(false);

	const handleReset = () => {
		setNewName(user.nickname);
		setNewEmail(user.email);
		setRole(user.role);
		setNewPassword("");
		setNewPassword1("");
		setDisabled(true); 
	};

	const getUser = async () => {
		try {
			const { data } = await axios.get(`${apiUrl}/users/${id}`);
			setUser(data);
			setNewName(data.nickname);
			setNewEmail(data.email);
			setRole(data.role);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
		console.log(e);
		return;
		e.preventDefault();

		if(newPassword !== newPassword1 || newPassword.length < 0 || newPassword1.length < 0){
			if(newPassword.length <= 0 || newPassword1.length <= 0)
				return;

			setErrors([{ msg: "Passwords do not match", path: "password" }]);
			return;	
		}

		const headers = {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};

		let body;
		if(newPassword.length > 0){
			body = JSON.stringify({
				nickname: newName,
				email: newEmail,
				role,
				password: newPassword,
			});
		}else{
			body = JSON.stringify({
				nickname: newName,
				email: newEmail,
				role
			});
		}

		try {
			const res = await axios.patch(`${apiUrl}/users/update/${id}`, body, { headers: headers });
			console.log(res);
			setErrors([]);
			setSaved(true);
			setTimeout(() => {
				navigate("/users");
			}, 3000);
		} catch (error : any) {
			console.log(error)
			setErrors(error.response.data.errors);
		}

	};

	return (
		<Layout>
			<form className="w-9/12 mt-sm">
				<h3 className="text-titleMd mb-xl">INFORMACIÓN DE LA CUENTA</h3>
				<div className="flex flex-row -mx-sm mb-md">
					<FormField
						label="Nombre"
						value={newName}
						placeholder={user.nickname}
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
				<div className="flex flex-row -mx-sm mb-md">
					<FormField
						label="Nueva contraseña"
						value={newPassword}
						placeholder="********"
						onChange={setNewPassword}
						disabled={isDisabled}
						type={inputType.password}
					/>
					<FormField
						label="Repetir contraseña"
						value={newPassword1}
						placeholder="********"
						onChange={setNewPassword1}
						type={inputType.password}
						disabled={isDisabled}
					/>
				</div>
				<RoleSelector  disabled={ isDisabled } setValue={ setRole } value={ role }/>
				{
					errors.length > 0 ?
						errors.map((error : any, i) =>
							<p key={i} className="text-red-500 text-end my-sm"><span className="capitalize">{error.path}</span> : {error.msg}</p>
						)
					: ""
				}
				{
					saved && <p className="text-green-600 text-end my-sm">Creado con éxito</p>
				}
				<div className="flex justify-end space-x-sm mt-md">
					<button
						type="button"
						onClick={() => handleReset()}
						className={`bg-red-500 hover:bg-red-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md 
            flex items-center gap-sm ${isDisabled && "hidden"}`}
					>
						<span>Cancelar</span>
						<img src={cancel} className="w-md "></img>
					</button>
					{
						isDisabled ?
							<button
								onClick={() => setDisabled(false)}
								className="bg-green-500 hover:bg-green-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm"
							>
								<span>Editar</span>
								<img src={edit} className="w-md "></img>
							</button>
						:
							<button
								type="submit"
								className="bg-green-500 hover:bg-green-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm"
							>
								<span>Guardar</span>
								<img src={save} className="w-md "></img>
							</button>
					}
				</div>
			</form>
		</Layout>
	);
};
