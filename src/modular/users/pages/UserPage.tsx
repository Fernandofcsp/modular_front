import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../ui/layout/Layout";
import axios from "axios";
import { apiUrl } from "../../../api";
import { useEffect, useState } from "react";
import { userStore } from "../../../store/userStore";
import { FormField, RoleSelector, inputType } from "../moleculs";
import cancel from "../../../../public/assets/icons/cancel.png";
import save from "../../../../public/assets/icons/salvar.png";
import edit from "../../../../public/assets/icons/editar.png";
import back from "../../../../public/assets/icons/back.png";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (type: any) => {
  switch (type) {
    case "WARN":
      toast.error(
        "Las contraseñas no coinciden o no contienen mayusculas y/o caracteres especiales ",
        {
          position: toast.POSITION.TOP_RIGHT,
          className: "mt-3xl",
        }
      );
      break;
    case "ERROR":
      toast.error(
        "Error en el sistema, intentelo mas tarde, si el problema persiste, consulte a soporte.",
        { position: toast.POSITION.TOP_RIGHT, className: "mt-3xl" }
      );
      break;
    case "SUCCESS":
      toast.success("Datos de usuario actualizados", {
        position: toast.POSITION.TOP_RIGHT,
        className: "mt-3xl",
      });
      break;
  }
};
export const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    nickname: "",
    email: "",
    role: "",
  });
  const token = userStore((state) => state.token);
  const navigate = useNavigate();
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [rePassword, setrePassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isDisabled, setDisabled] = useState(true);
  const [changePassword, setChangePassword] = useState(false);

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/users/${id}`);
      console.log(data);
      setUser(data);
      setNewName(`${data.nickname}`);
      setNewEmail(`${data.email}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleReset = () => {
    setNewName(`${user.nickname}`);
    setNewEmail(`${user.email}`);
    setrePassword("");
    setNewPassword("");
    setDisabled(true);
    setChangePassword(false);
  };

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = JSON.stringify({
      nickname: newName ? newName : undefined,
      email: newEmail ? newEmail : undefined,
      password: newPassword ? rePassword : undefined,
    });

    const config = {
      method: "patch",
      url: `${apiUrl}/users/update/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    try {
      const { data, status } = await axios.request(config);
      console.log(data);
      if (status == 200) {
        notify("SUCCESS");
        handleReset();
      }
    } catch (error: any) {
      console.log("Este es el error");
      console.log(error);

      if (error.message == "Request failed with status code 400") {
        notify("WARN");
      } else {
        notify("ERROR");
      }
    }
  };

  return (
    <Layout>
      <form onSubmit={(event) => updateUser(event)} className="w-9/12 mt-sm">
        <h3 className="text-titleMd mb-xl">INFORMACIÓN DE LA CUENTA</h3>

        <div className="flex flex-row -mx-sm py-sm">
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
        {!isDisabled && (
          <p
            className="py-sm text-blue-700 cursor-pointer"
            onClick={() => setChangePassword((value) => !value)}
          >
            {changePassword ? "Cancelar cambio de contraseña " : "Cambiar contraseña de usuario"}
          </p>
        )}

        {changePassword && (
          <div className="flex flex-row -mx-sm mb-md">
            <FormField
              label="Contraseña nueva"
              value={newPassword}
              placeholder=""
              onChange={setNewPassword}
              disabled={isDisabled}
              type={inputType.password}
            />
            <FormField
              label="Repetir contraseña"
              value={rePassword}
              placeholder=""
              onChange={setrePassword}
              type={inputType.password}
              disabled={isDisabled}
            />
          </div>
        )}

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
            type={isDisabled ? "submit" : "button"}
            onClick={() => {
              navigate("/users");
            }}
            className={`bg-blue-500 hover:bg-blue-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md 
            flex items-center gap-sm ${!isDisabled && "hidden"}`}
          >
            <span>Volver</span>
            <img src={back} className="w-md "></img>
          </button>
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
            onClick={() => {
              setDisabled((value) => !value);
            }}
            className="bg-green-500 hover:bg-green-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm"
          >
            <span>{!isDisabled ? "Guardar" : "Editar"}</span>
            <img src={!isDisabled ? save : edit} className="w-md "></img>
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => handleReset()}
            className={`bg-red-500 hover:bg-red-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md 
            flex items-center gap-sm ${isDisabled && "hidden"}`}
          >
            <span>{!isDisabled ? "Eliminar Usuario" : ""}</span>
            <img src={!isDisabled ? cancel : ""} className="w-md "></img>
          </button>
        </div>
        <ToastContainer />
      </form>
    </Layout>
  );
};
