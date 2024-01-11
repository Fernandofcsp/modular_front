import Layout from "../../../ui/layout/Layout";
import { AccountsTable, AccountsOptions } from "../components";

export const AccountsPage = () => {
	return (
		<Layout>
			<div>
				<AccountsOptions/>
				<AccountsTable/>
			</div>
		</Layout>
	)
}
