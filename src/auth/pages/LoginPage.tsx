import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import "../../style.css";
import { userStore } from "../../store/userStore";

export const LoginPage = () => {
  const { email, password, onInputChange } = useForm({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState("");

  //Navegar
  const navigate = useNavigate();

  const setToken = userStore((state) => state.setToken);
  const setName = userStore((state) => state.setName);
  const setId = userStore((state) => state.setId);
  const setRol = userStore((state) => state.setRol);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      setAlert("Llene todos los campos");
      setTimeout(function () {
        setAlert("");
      }, 4000);
      return;
    } else {
      //Colocar código para consultar la api aqui y hacer el inicio de sesión y cambio de contexto
      // Navega al inicio
      setToken("wkfhbwiufhwiu415648fwef");
      setName("Francisco");
      setId(7);
      setRol(1);
      navigate("/");
    }
  };

  return (
    // From small it would be slate
    <div className="flex-row bg-logInBackground h-full">
      <h2 className="text-4xl text-black font-semibold text-center">
        Inicio de sesión
      </h2>
      <form>
        <input
          value={email}
          onChange={onInputChange}
          name="email"
          className=""
          placeholder="Correo"
          type="email"
        />
        <input
          value={password}
          onChange={onInputChange}
          name="password"
          className=""
          placeholder="Contraseña"
          type="password"
        />
        <p className="text-red-500">{alert}</p>
        <input
          className=""
          type="submit"
          value="Entrar"
          onClick={(event) => handleSubmit(event)}
        />
      </form>
    </div>
  );
};
