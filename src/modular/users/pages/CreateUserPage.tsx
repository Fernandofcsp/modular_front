import Layout from "../../../ui/layout/Layout";
import { CreateUserForm } from "../components";

export const CreateUserPage = () => {
	return (
		<Layout>
			<div>
				<p className="text-headerTitle">Crear usuario</p>
				<CreateUserForm />
			</div>
		</Layout>
	)
}
