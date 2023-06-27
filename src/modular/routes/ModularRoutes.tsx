import { Navigate, Route, Routes } from "react-router-dom";
import { ModularPage } from '../pages/ModularPage';
// import { NotFoundPage } from "../pages/NotFoundPage";


export const ModularRoutes = () => {
  return (
    <Routes>
        {/* Página principal */}
        <Route path="/" element={<ModularPage />} />

        {/* <Route path="*" element={<NotFoundPage />} /> */}
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
} 
