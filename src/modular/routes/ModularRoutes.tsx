import { Navigate, Route, Routes } from "react-router-dom";
import { ModularPage } from '../pages/ModularPage';


export const ModularRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<ModularPage />} />

        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
} 
