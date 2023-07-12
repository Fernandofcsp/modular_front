import { userStore } from "../../store/userStore";
import Layout from "../../ui/layout/Layout";

export const ProfilePage = () => {
    const { id, name, rol, token } = userStore((state) => state);
    return (
    <Layout>
        <div>
        <p>Tu ID: {id}</p>
        <p>Nombre: {name}</p>
        <p>Rol: {rol}</p>
        <p>Token: {token}</p>
        </div>
    </Layout>
    );
};