import { useParams } from "react-router-dom";
import Layout from "../../../ui/layout/Layout";
import axios from "axios";
import { apiUrl } from "../../../api";
import { useEffect, useState } from "react";
import { userStore } from "../../../store/userStore";
import { FormField, inputType } from "../moleculs";
import cancel from "../../../../public/assets/icons/cancel.png";
import save from "../../../../public/assets/icons/salvar.png";
import edit from "../../../../public/assets/icons/editar.png";
export const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    nickname: "",
    email: "",
    role: "",
  });
  const token = userStore((state) => state.token);

  const [newName, setNewName] = useState(user.nickname);
  const [newEmail, setNewEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isDisabled, setDisabled] = useState(true);

  const handleReset = () => {
    setNewName("");
    setNewEmail("");
    setOldPassword("");
    setNewPassword("");
    setDisabled(true);
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/users/${id}`);
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${apiUrl}/users/update/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",

      // Fields that to be updated are passed
      body: JSON.stringify({
        nickname: newName,
        email: newEmail,
      }),
    })
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  };

  return (
    <Layout>
      <form onSubmit={(event) => updateUser(event)} className="w-9/12 mt-sm">
        <h3 className="text-titleMd mb-xl">INFORMACIÓN DE LA CUENTA</h3>
        <div className="flex flex-row -mx-sm mb-md">
          <FormField
            label="Nombre"
            value={newName}
            placeholder={user.nickname}
            onChange={setNewName}
            type={inputType.text}
            disabled={isDisabled}
          />
          <FormField
            label="Correo"
            value={newEmail}
            placeholder={user.email}
            onChange={setNewEmail}
            type={inputType.email}
            disabled={isDisabled}
          />
        </div>
        <div className="flex flex-row -mx-sm mb-md">
          <FormField
            label="Contraseña Actual"
            value={oldPassword}
            placeholder="********"
            onChange={setOldPassword}
            disabled={isDisabled}
            type={inputType.password}
          />
          <FormField
            label="Contraseña Nueva"
            value={newPassword}
            placeholder="Ingrese la contraseña"
            onChange={setNewPassword}
            type={inputType.password}
            disabled={isDisabled}
          />
        </div>
        <div className="flex flex-row -mx-sm mb-md">
          <div className="flex flex-col items-start px-sm w-1/2 mb-sm md:mb-0">
            <p className="block mb-sm text-lg font-bold uppercase text-gray-900">
              Rol del usuario
            </p>
            <p className="focus:bg-white bg-gray-50 text-gray-800 text-md rounded-md block w-full p-sm">
              {user.role}
            </p>
          </div>
        </div>
        <div className="flex justify-end space-x-sm">
          <button
            type="button"
            onClick={() => handleReset()}
            className={`bg-red-500 hover:bg-red-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md 
            flex items-center gap-sm ${isDisabled && "hidden"}`}
          >
            <span>Cancelar</span>
            <img src={cancel} className="w-md "></img>
          </button>
          <button
            type={isDisabled ? "submit" : "button"}
            onClick={() => setDisabled((value) => !value)}
            className="bg-green-500 hover:bg-green-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm"
          >
            <span>{!isDisabled ? "Guardar" : "Editar"}</span>
            <img src={!isDisabled ? save : edit} className="w-md "></img>
          </button>
        </div>
      </form>
    </Layout>
  );
};
