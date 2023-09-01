import { userStore } from "../../store/userStore";
import Layout from "../../ui/layout/Layout";

export const ProfilePage = () => {
  const { id, name, email, rol } = userStore((state) => state);
  return (
    <Layout>
      <div>
        <p>Tu ID: {id}</p>
        <p>Nombre: {name}</p>
        <p>Email: {email}</p>
        <p>Rol: {rol}</p>
      </div>
    </Layout>
  );
};