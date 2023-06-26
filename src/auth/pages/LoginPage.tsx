import { useForm } from "../hooks/useForm"
import "./LoginStyle.css";
import "../../style.css";


export const LoginPage = () => {
  const { email, password, formState, onInputChange, onResetForm } = useForm({email: '', password: ''});


  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(email === '' || password === ''){
      //
    }
  }

  return (
    <div className="container">
      <div className="form-container">
        <p className="logIn-title">Inicio de sesión</p>
        <form>
          <input value={email} onChange={onInputChange} name="email" className="input-logIn" placeholder="Correo" type="email"/>
          <input value={password} onChange={onInputChange} name="password" className="input-logIn" placeholder="Contraseña" type="password"/>
          <input className="button-logIn" type="submit" value="Entrar" onClick={(event) => handleSubmit(event)}/>
        </form>
      </div>
    </div>
  )
}
