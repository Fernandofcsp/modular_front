import { userStore } from "../../store/userStore";
import Layout from "../../ui/layout/Layout";
import { useState } from "react";
import { apiUrl } from "../../api";
import edit from "../../../public/assets/icons/editar.png";
import save from "../../../public/assets/icons/salvar.png";
import cancel from "../../../public/assets/icons/cancel.png";
import { FormField, inputType } from "../users/moleculs/FormField";

export const ProfilePage = () => {
  const { id, name, email, rol } = userStore((state) => state);
  const token = userStore((state) => state.token);
  const setValue = userStore((state) => state.setValue);

  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
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
        setValue("email", newEmail);
        setValue("name", newName);
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
              {rol}
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
