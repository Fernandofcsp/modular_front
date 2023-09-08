import { useState, useEffect } from "react";
import { TableBodyRow, TableHeadItem } from "../moleculs";
import axios from 'axios';
import { apiUrl } from "../../../api";

enum TableHeaders {
    name = "Nombre",
    email = "Correo",
    rol = "Permisos",
    creationDate = "Fecha de creación",
    ver = "Ver"
}
 
interface IUsers {
    data: Array
}

const initialState : IUsers = [{}];


export const EmployeesTable = () => {
  const [users, setUsers] = useState(initialState);

  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/users`, { params: {take: 20, skip: 0} });
      setUsers(data);
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
        <thead className="text-md text-gray-700 uppercase bg-gray-50">
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
              return <TableBodyRow key={i} id={user.user_id}name={user.nickname} email={user.email} rol={user.role} creationDate={user.created_date}/>
            })
          }
        </tbody>
      </table>
    </div>

  )
}
