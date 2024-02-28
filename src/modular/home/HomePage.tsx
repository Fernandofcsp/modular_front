import Layout from "../../ui/layout/Layout";
import { GraphicsContainer } from "./components";

export const HomePage = () => {

  return (
    <Layout>
      <div className="space-y-md h-screen">
				<p className="text-headerTitle">Dashboard</p>
				<GraphicsContainer />
      </div>
    </Layout>
  );
};
