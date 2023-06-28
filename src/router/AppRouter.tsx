import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { ModularRoutes } from '../modular/routes/ModularRoutes';
import { NotFoundPage } from "../modular/pages/NotFoundPage";

export const AppRouter = () => {
  return (
    <Routes>
        {/* Login */}
        <Route path="/login" element={ <LoginPage /> } />
        {/* Not found page */}
        <Route path="/login/*" element={ <NotFoundPage /> } />

        {/* Modular app */}
        <Route path="/*" element={ <ModularRoutes /> } />
    </Routes>
  )
}