import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { ModularRoutes } from '../modular/routes/ModularRoutes';
import { NotFoundPage } from "../modular/pages/NotFoundPage";
import { userStore } from "../store/userStore";

export const AppRouter = () => {
  const id = userStore((state) => state.id);
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={ id === null ? <LoginPage /> : <ModularRoutes /> } />
      {/* Not found page */}
      <Route path="/login/*" element={ <NotFoundPage /> } />

      {/* Modular app */}
      <Route path="/*" element={ id !== null ? <ModularRoutes /> : <LoginPage /> } />
    </Routes>
  )
}