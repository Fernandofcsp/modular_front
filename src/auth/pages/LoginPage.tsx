import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../store/userStore";
import { validateLoginFields } from '../helpers/emailValidator';
import { LogInForm } from "../components/LogInForm";
import axios from "axios";
import { apiUrl } from "../../api";
import { notify } from "../components/LogInForm";
import { toast } from "react-toastify";

interface IUser {
	email: string;
	password: string;
}

const initialState: IUser = {
	email: "",
	password: "",
};
export const LoginPage = () => {
	// TODO: REMOVE useForm
	const { email, password, onInputChange } = useForm(initialState);

	//Navegar
	const navigate = useNavigate();
	const setValue = userStore((state) => state.setValue);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const errors = validateLoginFields(email, password);

		if (errors!.length > 0) {
			errors?.map(error => toast.error(error));
			return;
		}

		try {
			const jsonData = {
				email,
				password
			};

			const { data } = await axios.post(`${apiUrl}/users/login/`, jsonData)
			const { user } = data;
			//setValue("token", token);
			// setValue("id", user.user_id);
			// setValue("email", email);
			// setValue("user_name", user.nickname);
			navigate("/");
		} catch (error) {
			console.log(error);
			notify("ERROR");
			//Borrar
			setValue("role", "ADMIN");
			setValue("id", "3");
			setValue("email", "admin@admin.com");
			setValue("name", "Administrador");
			setValue("role", "ADMIN");
			navigate("/");
		}
	}

	return (
		<div className="bg-gray-50">
			<div className="flex flex-col items-center justify-center px-md py-lg mx-auto md:h-screen lg:py-0">
				<p className="mb-lg text-titleSm uppercase">RICDSA MOTION SA DE CV</p>
				<div className="w-full bg-white rounded-md shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
					<div className="p-md space-y-sm md:space-y-md sm:p-lg">
						<p className="text-xl font-bold text-gray-900">LOGIN</p>
						<LogInForm
							handleSubmit={handleSubmit}
							onInputChange={onInputChange}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
