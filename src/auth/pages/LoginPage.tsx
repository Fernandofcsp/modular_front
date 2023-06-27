import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import "./LoginStyle.css";
import "../../style.css";


export const LoginPage = () => {
  const { email, password, onInputChange } = useForm({email: '', password: ''});
  const [alert, setAlert] = useState("");

  //Navegar
  const navigate = useNavigate()


  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(email === '' || password === ''){
      setAlert("Llene todos los campos");
      setTimeout(function(){
        setAlert("");
      }, 4000);
      return;
    }else{
      //Colocar código para consultar la api aqui y hacer el inicio de sesión y cambio de contexto
      // Navega al inicio
      navigate('/');

    }
  }

  return (
    <div className="container">
      <div className="form-container">
        <p className="logIn-title">Inicio de sesión</p>
        <form>
          <input value={email} onChange={onInputChange} name="email" className="input-logIn" placeholder="Correo" type="email"/>
          <input value={password} onChange={onInputChange} name="password" className="input-logIn" placeholder="Contraseña" type="password"/>
          <p className="form-alert">{alert}</p>
          <input className="button-logIn" type="submit" value="Entrar" onClick={(event) => handleSubmit(event)}/>
        </form>
      </div>
    </div>
  )
}
