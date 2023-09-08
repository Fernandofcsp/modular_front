import Layout from "../../../ui/layout/Layout";
import { EmployeesTable, EmployeesOptions } from "../components";

export const EmployeesPage = () => {
	return (
		<Layout>
			<div>
				<EmployeesOptions/>
				<EmployeesTable/>
			</div>
		</Layout>
	)
}
