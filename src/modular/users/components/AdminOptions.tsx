import { NavLink } from 'react-router-dom';

export const AdminOptions = () => {
  return (
    <div className="flex justify-end items-center py-md">
      <NavLink to={"/createUser"} className="text-white text-lg uppercase bg-blue-800 hover:font-semibold px-md py-xsm rounded-md hover:bg-blue-600">Nuevo usuario</NavLink>
    </div>
  )
}
