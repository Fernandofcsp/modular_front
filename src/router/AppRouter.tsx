import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { ModularRoutes } from '../modular/routes/ModularRoutes';

export const AppRouter = () => {
  return (
    <Routes>
        {/* Login */}
        <Route path="/auth/*" element={ <LoginPage /> } />

        {/* Modular app */}
        <Route path="/*" element={ <ModularRoutes /> } />
    </Routes>
  )
}