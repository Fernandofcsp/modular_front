import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../api";
import { userStore } from "../../../store/userStore";
import save from "../../../../public/assets/icons/salvar.png";
import cancel from "../../../../public/assets/icons/cancel.png";
import { FormField, inputType } from "../moleculs/FormField";

export const CreateUserForm = () => {
	const navigate = useNavigate();
	const token = userStore((state) => state.token);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [role, setRole] = useState("");
	const [errors, setErrors] = useState([]);
	const [saved, setSaved] = useState(false);

	const saveUser = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if(password !== password2){
			setErrors([]);
			setErrors(errors => [...errors, { msg: "Passwords do not match", path: "password" }]);
			return;
		}
		
		const data = JSON.stringify({
			nickname: name,
			email: email,
			password: password,
			role: role,
		});

		const config = {
			method: "post",
			url: `${apiUrl}/users/create`,
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
			setErrors([]);
			setSaved(true);
			setTimeout(() => {
				navigate("/users");
			}, 3000);
		} catch (error : any) {
			console.log(error.response.data.message);
			if(error.response.data.message){
				setErrors(errors => [...errors, { msg: error.response.data.message, path: "User" }]);
				return;
			}

			setErrors(error.response.data.errors);

		}
	}

	return (
		<form onSubmit={(event) => saveUser(event)} className="w-9/12 mt-sm">
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
					<label className="block mb-sm text-lg font-bold uppercase text-gray-900">
						Selecciona el rol para el usuario
					</label>
					<select
						onChange={({ target }) => setRole(target.value)}
						value={role}
						className="focus:bg-white bg-gray-50 text-gray-800 text-md rounded-md block w-full p-sm"
					>
						<option>Elige un rol</option>
						<option value="ADMIN">Administrador</option>
						<option value="READ">Sólo lectura</option>
						<option value="WRITE">Lectura y escritura</option>
						<option value="OVERWRITE">
							Lectura, escritura y modificar datos
						</option>
					</select>
				</div>
			</div>
			{
				errors.length > 0 &&
					errors.map((error : any, i) => 
						<p key={i} className="text-red-500 text-end my-sm"><span className="capitalize">{ error.path }</span> : {error.msg}</p>
					)
			}
			{
				saved && <p className="text-green-600 text-end my-sm">Creado con éxito</p>
			}
			<div className="flex justify-end space-x-sm">
				<button
					onClick={() => navigate("/users")}
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
};
