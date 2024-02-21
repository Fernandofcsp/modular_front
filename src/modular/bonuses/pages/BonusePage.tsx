import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../ui/layout/Layout";
import axios from "axios";
import { apiUrl } from "../../../api";
import { useEffect, useState } from "react";
import { userStore } from "../../../store/userStore";
import cancel from "../../../../public/assets/icons/cancel.png";
import save from "../../../../public/assets/icons/salvar.png";
import edit from "../../../../public/assets/icons/editar.png";
import { FormField } from "../../employees-check/moleculs";
import { inputType } from "../../users/moleculs";
import { BackButton } from "../../../ui/moleculs/BackButton";
import { toast } from "react-toastify";
import { BonusesTable } from "../components/BonusesTable";
interface IBonuse {
	id: string;
	name: string;
	admissionDate: string;
	dailySalary: number;
	monthlySalary: number;
	allowance: number;
	fuelVouchers: number;
	totalMonthly: number;
	absences: number;
	absencesNumber: number;
	absencesCost: number;
	errorsNumber: number;
	errorsCost: number;
	baseForCalculation: number;
	bonus: number;
	fullBonus: number;
	difference: number;
}

const initialState: IBonuse = {
	id: "",
	name: "",
	admissionDate: "",
	dailySalary: 0,
	monthlySalary: 0,
	allowance: 0,
	fuelVouchers: 0,
	totalMonthly: 0,
	absences: 0,
	absencesNumber: 0,
	absencesCost: 0,
	errorsNumber: 0,
	errorsCost: 0,
	baseForCalculation: 0,
	bonus: 0,
	fullBonus: 0,
	difference: 0,
};

export const BonusePage = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const id = state.id;
	const [bonuse, setBonuse] = useState<IBonuse>(initialState);
	const token = userStore((state) => state.token);

	const [isDisabled, setDisabled] = useState(true);

	const handleReset = () => {
		setBonuse(initialState);
		setDisabled(true);
	};

	const getAccount = async () => {
		try {
			const { data } = await axios.get(`${apiUrl}/bonuse/${id}`);
			setBonuse(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAccount();
	}, []);

	return (
        
		<Layout>
			<form className="w-9/12 mt-sm">
				<h3 className="text-titleSm mb-xl uppercase">Datos del bono del empleado</h3>
				<div className="flex flex-row space-x-sm">
					<FormField
						label=""
						value={concept}
						placeholder={"Concepto de la cuenta"}
						onChange={setConcept}
						type={inputType.text}
						disabled={isDisabled}
					/>
					<FormField
						label="Referencia"
						value={reference}
						placeholder={"Referencia bancaria"}
						onChange={setReference}
						type={inputType.text}
						disabled={isDisabled}
					/>
				</div>
				
			</form>
		</Layout>
	);
};
