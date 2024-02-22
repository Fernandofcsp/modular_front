import Layout from "../../../ui/layout/Layout";
import { AdminOptions, UsersTable } from "../components";

export const UsersPage = () => {
  return (
    <Layout>
			<div>
				<AdminOptions />
				<UsersTable />
			</div>
    </Layout>
  )
}
