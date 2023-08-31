import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from '../home/HomePage';
import { ProfilePage } from "../user/ProfilePage";
import { UserPage, UsersPage, CreateUserPage } from "../users/pages";


export const ModularRoutes = () => {
  return (
    <Routes>
        {/* Página principal */}
        <Route path="/" element={<HomePage />} />

        {/* Página del perfil */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Página de empleados */}
        <Route path="/users" element={<UsersPage />} />

        {/* Página de solo un empleado */}
        <Route path="/user/:id" element={<UserPage />} />

        {/* Página para crear usuario */}
        <Route path="/createUser" element={<CreateUserPage />} />

        {/* <Route path="*" element={<NotFoundPage />} /> */}
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
} 
