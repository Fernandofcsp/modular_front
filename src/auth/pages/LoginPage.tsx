import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../../store/userStore';
import { validateEmail } from '../helpers/emailValidator';
import { LogInForm } from '../components/LogInForm';
import axios from 'axios';
import { apiUrl } from '../../api';


interface IUser {
	email : string,
	password : string,
}

const initialState : IUser = {
  email : "",
  password : "",
}
export const LoginPage = () => {
  // TODO: REMOVE useForm
  const { email, password, onInputChange } = useForm(initialState);
  const [alert, setAlert] = useState('');

  //Navegar
  const navigate = useNavigate();
  const setValue = userStore((state) => state.setValue);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email === '' || password === '') {
      setAlert('Llene los campos');
      setTimeout(() => {
        setAlert('');
      }, 4000);
      return;
    } else {
      if(!validateEmail(email)){
        setAlert('Ingrese un email válido');
        setTimeout(() => {
          setAlert('');
        }, 4000);
        return;
      }

      try {
        const { data } = await axios.get(`${apiUrl}/auth/login`, { params: { email, password } });
        const { token, user } = data;
        console.log(user);
        setValue('token', token);
        setValue('id', user.user_id);
        setValue('email', email);
        setValue('name', user.nickname);
        setValue('rol', user.role);
        navigate('/');
      } catch (error) {
        setAlert('Correo o contraseña inválidos');
        setTimeout(() => {
          setAlert('');
        }, 4000);
        return;
      }
    }
  };

  return (
    <div className='bg-gray-50'>
      <div className='flex flex-col items-center justify-center px-md py-lg mx-auto md:h-screen lg:py-0'>
        <p className='mb-lg text-titleMd uppercase'>Nombre de la empresa</p>
        <div className='w-full bg-white rounded-md shadow dark:border md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-md space-y-sm md:space-y-md sm:p-lg'>
            <p className='text-2xl font-bold text-gray-900'>
							LOGIN
            </p>
            <LogInForm handleSubmit={handleSubmit} onInputChange={onInputChange} alert={alert}/>
          </div>
        </div>
      </div>
    </div>
  );
};
