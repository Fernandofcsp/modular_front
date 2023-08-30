import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from '../home/HomePage';
import { ProfilePage } from "../user/ProfilePage";
// import { NotFoundPage } from "../pages/NotFoundPage";


export const ModularRoutes = () => {
  return (
    <Routes>
        {/* Página principal */}
        <Route path="/" element={<HomePage />} />

        {/* Página del perfil */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* <Route path="*" element={<NotFoundPage />} /> */}
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
} 
