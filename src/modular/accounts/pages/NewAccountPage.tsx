import Layout from "../../../ui/layout/Layout";
import { CreateAccountForm } from "../components/CreateAccountForm";


export const NewAccountPage = () => {
	return (
		<Layout>
			<div>
				<p>Nuevo empleado</p>
				<CreateAccountForm />
			</div>
		</Layout>
	)
}
