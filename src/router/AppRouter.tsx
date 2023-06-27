import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { ModularRoutes } from '../modular/routes/ModularRoutes';
import { NotFoundPage } from "../modular/pages/NotFoundPage";

export const AppRouter = () => {
  return (
    <Routes>
        {/* Login */}
        <Route path="/auth" element={ <LoginPage /> } />
        {/* Not found page */}
        <Route path="/auth/*" element={ <NotFoundPage /> } />

        {/* Modular app */}
        <Route path="/*" element={ <ModularRoutes /> } />
    </Routes>
  )
}