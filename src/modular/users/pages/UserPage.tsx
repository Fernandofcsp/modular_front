import { useParams } from "react-router-dom"
import Layout from "../../../ui/layout/Layout"


export const UserPage = () => {
  const { id } = useParams();
  return (
    <Layout>
      <div>ID: {id}</div>
    </Layout>
  )
}
