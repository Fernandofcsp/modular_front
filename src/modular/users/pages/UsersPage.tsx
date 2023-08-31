import Layout from "../../../ui/layout/Layout";
import { AdminOptions, EmployeesTable } from "../components";

export const UsersPage = () => {
  return (
    <Layout>
        <AdminOptions />
        <EmployeesTable />
    </Layout>
  )
}
