import Layout from "../../../ui/layout/Layout";
import { AdminOptions, UsersTable } from "../components";

export const UsersPage = () => {
  return (
    <Layout>
			<div className="w-full space-y-md">
				<div className="flex justify-end w-full">
					<AdminOptions />
				</div>
				<UsersTable />
			</div>
    </Layout>
  )
}
