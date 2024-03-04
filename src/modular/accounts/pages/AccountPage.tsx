import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../ui/layout/Layout";
import axios from "axios";
import { apiUrl } from "../../../api";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
//import { userStore } from "../../../store/userStore";
import { FormField } from "../../employees-check/moleculs";
import { inputType } from "../../users/moleculs";
import { CancelButton, EditButton, NavigateButton, SaveButton } from "../../../ui/moleculs";
import back from "../../../../public/assets/icons/back.png";
import { AccountMovements, IMovement } from "../components";
import { IAccount } from "../interfaces/interfaces";

const initialState: IAccount = {
	id: 0,
	name: "",
	created_at: "",
	created_by: 0
};

export const AccountPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [account, setAccount] = useState<IAccount>(initialState);
	const [accountMovements, setAccountMovements] = useState<IMovement[]>([]);
	//const token = userStore((state) => state.token);

	const [accountName, setAccountName] = useState("");
	const [isDisabled, setDisabled] = useState(true);

	const handleReset = () => {
		setAccountName(account.name);
		setDisabled(true);
	};

	const getAccount = () => {
		axios.get(
			`${apiUrl}/accounts/${id}`,
			{ validateStatus: (status: number) => status < 500 }
		)
			.then(({ data, status }) => {
				if (status != 200) throw ({ ...data, status });
				setAccount(data);
				setAccountName(data.name)
			})
			.catch(error => toast.error(error.message));
	};

	useEffect(() => {
		getAccount();
		//getAccountMovements();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const updateAccount = () => {
		if (accountName === "" || accountName.length <= 0) {
			toast.error("El nombre de la cuenta no puede estar vacío");
			return;
		} else {
			const data = {
				name: accountName,
			};

			axios.patch(
				`${apiUrl}/accounts/${id}/`,
				data,
				{ validateStatus: (status: number) => status < 500 }
			)
				.then(({ data, status }) => {
					if (status != 200 && status != 201) throw ({ ...data, status });
					setDisabled(true);
					toast.success("Actualizado con éxito");
				})
				.catch(error => toast.error(error.message));
		}
	};

	return (
		<Layout>
			<div>
				<form className="w-10/12 mt-sm">
					<h3 className="text-headerTitle mb-xl">Modificar cuenta</h3>
					<div className="flex flex-row space-x-sm">
						<FormField
							label="Nombre de la cuenta"
							value={accountName}
							placeholder={"Nombre de la cuenta"}
							onChange={setAccountName}
							type={inputType.text}
							disabled={isDisabled}
						/>
					</div>
					<div className="flex justify-end space-x-sm">
						{
							isDisabled ? (
								<>
									<NavigateButton image={back} title="Regresar" onClick={() => navigate("/accounts")} />
									<EditButton onClick={() => setDisabled(false)} title="Editar" />
								</>
							)
								: (
									<>
										<CancelButton onClick={() => handleReset()} title="Cancelar" />
										<SaveButton onClick={() => updateAccount()} title="Guardar" />
									</>
								)
						}
					</div>
				</form>
				{
					accountMovements.length > 0 ?
						<AccountMovements idAccount={account.id} movements={accountMovements} />
					: <p>Aún no existen movimientos para esta cuenta</p>
				}
				<ToastContainer />
			</div>
		</Layout>
	);
};
