import { useNavigate } from "react-router-dom";
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
import { validateUserFields } from "./helpers/validateUserFields";

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
export const ProfilePage = () => {
  const { id, name, email, rol } = userStore((state) => state);
  const token = userStore((state) => state.token);
  const navigate = useNavigate();
  const setValue = userStore((state) => state.setValue);

  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [role, setRole] = useState(rol);
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setrePassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [changePassword, setChangePassword] = useState(false);

  /*const getUser = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/users/${id}`);
      setNewName(`${data.nickname}`);
      setNewEmail(`${data.email}`);
      setRole(`${data.role}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */

  const handleReset = () => {
    setNewName(name);
    setNewEmail(email);
    setRole(rol);
    setrePassword("");
    setNewPassword("");
    setIsDisabled(true);
    setChangePassword(false);
  };

  const updateUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const errors = validateUserFields(
      newName,
      newEmail,
      role,
      changePassword,
      newPassword,
      rePassword
    );

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));

      return;
    }

    const data = JSON.stringify({
      nickname: newName ? newName : undefined,
      email: newEmail ? newEmail : undefined,
      password: newPassword ? rePassword : undefined,
      role: role,
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
        setValue("rol", role);
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
      <form className="w-9/12 mt-sm">
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
            <label className="block mb-sm text-lg font-bold uppercase text-gray-900">
              Rol de usuario
            </label>
            <select
              disabled={isDisabled}
              onChange={({ target }) => setRole(target.value)}
              value={role}
              className="focus:bg-white bg-gray-50 text-gray-800 text-md rounded-md block w-full p-sm"
            >
              <option value="INOPERATIVE">Inoperativo</option>
              <option value="READ">Sólo lectura</option>
              <option value="WRITE">Lectura y escritura</option>
              <option value="OVERWRITE">
                Lectura, escritura y modificar datos
              </option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-md py-sm">
          <button
            type="button"
            onClick={() => {
              setChangePassword((value) => !value);
            }}
            className={`bg-gray-700 hover:bg-gray-600 hover:font-bold text-white font-semibold py-0 px-xl rounded-md flex items-center${
              isDisabled && "hidden"
            }`}
          >
            <span className={`${isDisabled && "hidden"} ${changePassword ? 'py-xsm px-xl rounded-md flex items-center ml-xsm mr-xsm gap-xsm' : 'py-xsm px-lg rounded-md flex items-center gap-sm'} `}>
              {!changePassword ? "Cambiar contraseña" : "Cancelar cambio"}
            </span>
            <img
              src={!changePassword ? edit : cancel}
              className={`w-md py-sm ${isDisabled && "hidden"}`}
            ></img>
          </button>
        </div>
        <div className="flex justify-end space-x-sm">
          {isDisabled && (
            <button
              onClick={() => {
                navigate("/");
              }}
              className={`bg-blue-800 hover:bg-blue-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md 
								flex items-center gap-sm`}
            >
              <span>Volver</span>
              <img src={back} className="w-md "></img>
            </button>
          )}
          {!isDisabled && (
            <button
              onClick={() => handleReset()}
              className={`bg-red-800 hover:bg-red-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md 
								flex items-center gap-sm`}
            >
              <span>Cancelar</span>
              <img src={cancel} className="w-md "></img>
            </button>
          )}
          {isDisabled ? (
            <button
              onClick={(event) => {
                event.preventDefault();
                setIsDisabled(false);
              }}
              className={
                "hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm bg-green-800 hover:bg-green-600"
              }
            >
              <span>Editar</span>
              <img src={edit} className="w-md "></img>
            </button>
          ) : (
            <button
              onClick={(event) => updateUser(event)}
              className="hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm bg-green-800 hover:bg-green-600"
            >
              <span>{"Guardar"}</span>
              <img src={save} className="w-md "></img>
            </button>
          )}
        </div>
        <div>
          <ToastContainer />
        </div>
      </form>
    </Layout>
  );
};
