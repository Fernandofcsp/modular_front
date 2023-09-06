import { useState } from "react";
import { FormField } from "../moleculs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../api";
import { userStore } from "../../../store/userStore";

export const CreateUserForm = () => {
	const navigate = useNavigate();
	const token = userStore((state) => state.token);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [role, setRole] = useState("");

	const saveUser = async (e) => {
		e.preventDefault();
		const data = JSON.stringify({
			"nickname": name,
			"email": email,
			"password": password,
			"role": role
		});

		const config = {
			method: 'post',
			url: `${apiUrl}/users/create`,
			headers: {
				'Accept-Encoding': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			data: data
		};

		try {
			const { data } = await axios.request(config);
			console.log(data);
			navigate("/users");
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<form className="w-9/12 mt-sm">
			<div className="flex flex-row -mx-sm mb-md">
				<FormField label="Nombre" value={name} placeholder={"Nombre completo"} onChange={setName} type={"text"} />
				<FormField label="Correo" value={email} placeholder="Correo electrónico" onChange={setEmail} type={"email"} />
			</div>
			<div className="flex flex-row -mx-sm mb-md">
				<FormField label="Contraseña" value={password} placeholder="Contraseña" onChange={setPassword} type={"password"} />
				<FormField label="Confirmar contraseña" value={password2} placeholder="Repite la contraseña" onChange={setPassword2} type={"password"} />
			</div>
			<div className="flex flex-row -mx-sm mb-md">
				<div className="flex flex-col items-start px-sm w-1/2 mb-sm md:mb-0">
					<label className="block mb-sm text-lg font-bold uppercase text-gray-900">Selecciona el rol para el usuario</label>
					<select onChange={({ target }) => setRole(target.value)} value={role} className="focus:bg-white bg-gray-50 text-gray-800 text-md rounded-md block w-full p-sm">
						<option>Elige un rol</option>
						<option value="ADMIN">Administrador</option>
						<option value="READ">Sólo lectura</option>
						<option value="WRITE">Lectura y escritura</option>
						<option value="OVERWRITE">Lectura, escritura y modificar datos</option>
					</select>
				</div>
			</div>
			<div className="flex justify-end space-x-sm">
				<button onClick={() => navigate("/users")} className="bg-red-500 hover:bg-red-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md">
					Cancelar
				</button>
				<button type="submit" onClick={(event) => saveUser(event)} className="bg-green-500 hover:bg-green-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md">
					Guardar
				</button>
			</div>
		</form>
	)
}
