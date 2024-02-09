import { useNavigate, useParams } from "react-router-dom";
import { userStore } from "../../store/userStore";
import Layout from "../../ui/layout/Layout";
import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../api";
import edit from "../../../public/assets/icons/editar.png";
import save from "../../../public/assets/icons/salvar.png";
import cancel from "../../../public/assets/icons/cancel.png";
import back from "../../../public/assets/icons/back.png";
import { FormField, inputType } from "../users/moleculs/FormField";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (type: any) => {
  switch (type) {
    case "WARN":
      toast.error("Las contraseñas no coinciden o no contienen mayusculas y/o caracteres especiales ", {
        position: toast.POSITION.TOP_RIGHT,
        className: "mt-3xl",
      });
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
export const ProfilePage = () => {
  const { id, name, email, rol } = userStore((state) => state);
  const token = userStore((state) => state.token);
  const navigate = useNavigate();
  const setValue = userStore((state) => state.setValue);

  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [rePassword, setrePassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isDisabled, setDisabled] = useState(true);

  const handleReset = () => {
    setNewName(name);
    setNewEmail(email);
    setrePassword("");
    setNewPassword("");
    setDisabled(true);
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
      const { status } = await axios.request(config);
      if (status == 200) {
        notify("SUCCESS");
        setValue("email", newEmail);
        setValue("name", newName);
      }
    } catch (error : any) {
      console.log("Este es el error");
      console.log(error);
      
      if (error.message == "Request failed with status code 400"){
        notify("WARN");
      }
      else{
        notify("ERROR");
      }
      
    }
  };

  return (
    <Layout>
      <form onSubmit={(event) => updateUser(event)} className="w-9/12 mt-sm">
        <h3 className="text-titleMd mb-xl">INFORMACIÓN DE TU CUENTA</h3>
        <div className="flex flex-row -mx-sm mb-md">
          <FormField
            label="Nombre"
            value={newName}
            placeholder={name}
            onChange={setNewName}
            type={inputType.text}
            disabled={isDisabled}
          />
          <FormField
            label="Correo"
            value={newEmail}
            placeholder={email}
            onChange={setNewEmail}
            type={inputType.email}
            disabled={isDisabled}
          />
        </div>
        <div className="flex flex-row -mx-sm mb-md">
          <FormField
            label="Contraseña Nueva"
            value={newPassword}
            placeholder=""
            onChange={setNewPassword}
            disabled={isDisabled}
            type={inputType.password}
          />
          <FormField
            label="Repetir Contraseña"
            value={rePassword}
            placeholder=""
            onChange={setrePassword}
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
              {rol}
            </p>
          </div>
        </div>
        <div className="flex justify-end space-x-sm">
        <button
            type={isDisabled ? "submit" : "button"}
            onClick={() => {
              navigate("/");
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
            onClick={() => setDisabled((value) => !value)}
            className="bg-green-500 hover:bg-green-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm"
          >
            <span>{!isDisabled ? "Guardar" : "Editar"}</span>
            <img src={!isDisabled ? save : edit} className="w-md "></img>
          </button>
        </div>
        <div>
          <ToastContainer />
        </div>
      </form>
    </Layout>
  );
};
