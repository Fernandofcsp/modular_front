import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../home/HomePage";
import { ProfilePage } from "../user/ProfilePage";
import { UserPage, UsersPage, CreateUserPage } from "../users/pages";
import { EmployeePage, EmployeesPage, NewEmployeePage} from "../employees/pages";
import { AccountPage, NewAccountPage, AccountsPage } from "../accounts/pages";
import { EmployessCheckPage } from "../employees-check/pages/EmployessCheckPage";
import { InconsistencyPage } from '../employees-check/pages/InconsistencyPage';
import { BonusesPage } from "../bonuses/pages/BonusesPage";
import { BonusePage } from "../bonuses/pages";



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

      {/* Página de detalle de empleado */}
			<Route path="/employee/:id" element={<EmployeePage />} />

      {/* Página de checador de empleado */}
			<Route path="/employees-check" element={<EmployessCheckPage />} />

      {/* Página de detalle de inconsistencia */}
			<Route path="/inconsistency-detail/:id" element={<InconsistencyPage />} />

      {/* Página para crear nuevo empleado */}
      <Route path="/newEmployee" element={<NewEmployeePage />} />

      {/* Página de cuentas o gastos */}
      <Route path="/accounts" element={<AccountsPage />} />

      {/* Página para editar una cuenta */}
      <Route path="/account/:id" element={<AccountPage />} />

      {/* Página para crear usuario */}
      <Route path="/createUser" element={<CreateUserPage />} />

      {/* Página de cuentas */}
      <Route path="/accounts" element={<AccountsPage />} />

      {/* Página para crear cuentas */}
      <Route path="/newAccount" element={<NewAccountPage />} />

      {/* Página de bonos */}
			<Route path="/bonuses" element={<BonusesPage />} />
      {/* Página para ver bonos del mes */}
      <Route path="/bonuse" element={<BonusePage />} />


      {/* <Route path="*" element={<NotFoundPage />} /> */}
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
