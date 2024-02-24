import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../ui/layout/Layout";
import axios from "axios";
import { apiUrl } from "../../../api";
import { useEffect, useState } from "react";
import { userStore } from "../../../store/userStore";
import { FormField } from "../../employees-check/moleculs";
import { inputType } from "../../users/moleculs";
import { CancelButton, EditButton, NavigateButton, SaveButton } from "../../../ui/moleculs";
import { toast } from "react-toastify";
import back from "../../../../public/assets/icons/back.png";
import { AccountMovements, IMovement } from "../components";
import { movements } from "../helpers/data";

interface IAccount {
	idAccount: number,
	accountName: string;
}

const initialState: IAccount = {
	idAccount: 0,
	accountName: "",
};

export const AccountPage = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const id = state.id;
	const [account, setAccount] = useState<IAccount>(initialState);
	const [accountMovements, setAccountMovements] = useState<IMovement[]>([]);
	const token = userStore((state) => state.token);

	const [accountName, setAccountName] = useState("");
	const [isDisabled, setDisabled] = useState(true);

	const handleReset = () => {
		setAccountName(account.accountName);
		setDisabled(true);
	};

	const getAccount = async () => {
		try {
			const { data } = await axios.get(`${apiUrl}/account/${id}`);
			setAccount(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setAccountMovements(movements);
		//getAccount();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const updateAccount = async () => {
		toast.error("Error")
		if (accountName === "" || accountName.length <= 0) {
			toast.error("El nombre de la cuenta no puede estar vacío");
			return;
		} else {
			const data = JSON.stringify({
				accountName
			});

			const config = {
				method: "patch",
				url: `${apiUrl}/accounts/update/${id}`,
				headers: {
					"Accept-Encoding": "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				data: data,
			};

			console.log(config);
			/*
			try {
				const { data } = await axios.request(config);
				console.log(data);
				navigate("/account");
			} catch (error) {
				console.log(error);
			}*/
		}
	};

	return (
		<Layout>
			<div>
				<form className="w-10/12 mt-sm">
					<h3 className="text-headerTitle mb-xl uppercase">Modificar cuenta</h3>
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
						<AccountMovements idAccount={account.idAccount} movements={accountMovements} />
					: <p>Aún no existen movimientos para esta cuenta</p>
				}
			</div>
		</Layout>
	);
};
