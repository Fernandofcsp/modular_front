import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../home/HomePage";
import { ProfilePage } from "../user/ProfilePage";
import { UserPage, UsersPage, CreateUserPage } from "../users/pages";
import { EmployeePage, EmployeesPage, NewEmployeePage} from "../employees/pages";
import { AccountPage, AccountsPage, NewAccountPage } from "../accounts/pages";

export const ModularRoutes = () => {
  return (
    <Routes>
      {/* Página principal */}
      <Route path="/" element={<HomePage />} />

      {/* Página del perfil */}
      <Route path="/profile" element={<ProfilePage />} />

      {/* Página de usuarios */}
      <Route path="/users" element={<UsersPage />} />

      {/* Página de detalle de un usuario */}
      <Route path="/user/:id" element={<UserPage />} />

      {/* Página para crear nuevo usuario */}
      <Route path="/createUser" element={<CreateUserPage />} />

      {/* Página de empleados */}
      <Route path="/employees" element={<EmployeesPage />} />

      {/* Página de detalle de un empleado */}
      <Route path="/employee/:id" element={<EmployeePage />} />

      {/* Página para crear nuevo empleado */}
      <Route path="/newEmployee" element={<NewEmployeePage />} />

      {/* Página de cuentas o gastos */}
      <Route path="/accounts" element={<AccountsPage />} />

      {/* Página para editar una cuenta */}
      <Route path="/account/:id" element={<AccountPage />} />

      {/* Página para agregar cuenta(gastos) */}
      <Route path="/newAccount" element={<NewAccountPage />} />

      {/* <Route path="*" element={<NotFoundPage />} /> */}
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
