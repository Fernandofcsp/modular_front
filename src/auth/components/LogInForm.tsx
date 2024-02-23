import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ILogInForm {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    onInputChange: (event: React.FormEvent<HTMLInputElement>) => void,
}

export const notify = (type: string) => {
  switch (type){
    case ";":
      toast.error("Contraseña o correo incorrectos", {position: toast.POSITION.TOP_RIGHT});
      break;
    case "ERROR":
      toast.error("Error en el sistema, intentelo mas tarde, si el problema persiste, consulte a soporte.", {position: toast.POSITION.TOP_RIGHT});
      break;
    case "SUCCESS":
      toast.success("Ingreso exitoso", {position: toast.POSITION.TOP_RIGHT});
      break;
  }
}


export const LogInForm = (props: ILogInForm) => {
	const { handleSubmit, onInputChange } = props;
	return (
		<form
			className='space-y-md md:space-y-6'
			onSubmit={(e) => handleSubmit(e)}
		>
			<div className='space-y-sm'>
				<label
					htmlFor='email'
					className='block mb-2 text-xl font-medium text-gray-900'
				>
					Correo
				</label>
				<input
					onChange={onInputChange}
					type='email'
					name='email'
					id='email'
					className='bg-gray-50 text-gray-900 text-lg rounded-lg block w-full p-sm border-2 border-slate-300 focus:outline-none focus:border-slate-400'
					placeholder='name@company.com'
					required
				/>
			</div>
			<div className='space-y-sm'>
				<label
					htmlFor='password'
					className='block mb-2 text-xl font-medium text-gray-900'
				>
					Contraseña
				</label>
				<input
					onChange={onInputChange}
					type='password'
					name='password'
					id='password'
					placeholder='••••••••'
					className='bg-gray-50 text-gray-900 text-lg rounded-lg block w-full p-sm border-2 border-slate-300 focus:outline-none focus:border-slate-400'
					required
				/>
			</div>
			<div>
				<ToastContainer />
			</div>
			<div className='flex justify-center'>
				<button
					type='submit'
					className='text-white bg-blue-500 py-xsm px-md rounded-lg font-medium hover:bg-blue-600'
				>
					Ingresar
				</button>
			</div>
		</form>
	)
}
