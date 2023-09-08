import Layout from "../../../ui/layout/Layout";
import { CreateEmployeeForm } from "../components/CreateEmployeeForm";


export const NewEmployeePage = () => {
	return (
		<Layout>
			<div>
				<p>Nuevo empleado</p>
				<CreateEmployeeForm />
			</div>
		</Layout>
	)
}
