import Layout from "../../../ui/layout/Layout";
import { useNavigate } from "react-router-dom";
import { EmployeesTable } from "../components";
import { NavigateButton } from "../../../ui/moleculs";

export const EmployeesPage = () => {
	const navigate = useNavigate();
	return (
		<Layout>
			<div className="flex flex-col space-y-md">
				<div className="flex justify-end w-full">
					<NavigateButton title='Nuevo Empleado' onClick={() => navigate("/newEmployee")} />
				</div>
				<EmployeesTable />
			</div>
		</Layout>
	);
};
