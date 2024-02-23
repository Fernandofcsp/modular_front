import { useState, useEffect } from "react";
import { TableBodyRow, TableHeadItem } from "../moleculs";
import axios from 'axios';
import { apiUrl } from "../../../api";

enum TableHeaders {
    user_name = "Nombre",
    email = "Correo",
    rol = "Permisos",
    is_active = "Estado",
    ver = "Ver"
}

interface IUser {
	id : string,
	user_name : string,
	email : string,
	role : string,
  is_active: boolean,
}

export const UsersTable = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/users/`, { params: {take: 100, skip: 0} });
      setUsers(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, [])
    
  return (
    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
      <table className="w-full text-md text-left text-gray-500">
        <caption className="px-md py-sm text-xl font-semibold text-left text-gray-900 bg-white">
                    Usuarios del sistema
        </caption>
        <thead className="text-md text-gray-700 uppercase bg-gray-50 sticky top-0">
          <tr>
            {
              Object.entries(TableHeaders).map((e, i) => {
                return <TableHeadItem key={i} title={e[1]} />
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, i) => {
              return <TableBodyRow key={i} id={user.id} user_name={user.user_name} 
              email={user.email} rol={user.role} is_active={user.is_active}/>
            })
          }
        </tbody>
      </table>
    </div>

  )
}
