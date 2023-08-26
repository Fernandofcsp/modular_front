import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../../store/userStore';

export const LoginPage = () => {
	// TODO: REMOVE useForm
	const { email, password, onInputChange } = useForm({
		email: '',
		password: ''
	});
	const [alert, setAlert] = useState('');

	//Navegar
	const navigate = useNavigate();
	const setValue = userStore((state) => state.setValue);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (email === '' || password === '') {
			setAlert('Llene los campos');
			setTimeout(function () {
				setAlert('');
			}, 4000);
			return;
		} else {
			//Colocar código para consultar la api aqui y hacer el inicio de sesión y cambio de contexto
			// Navega al inicio
			setValue('id', '1234');
			setValue('email', email);
			setValue('name', 'Fernando');
			setValue('rol', 'Admin');
			setValue('token', 'shfkbdfjvbjdsfbvjsdfv');
			navigate('/');
		}
	};

	return (
		<div className='bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col items-center justify-center px-md py-lg mx-auto md:h-screen lg:py-0'>
				<p className='mb-lg text-titleLg'>Nombre de la empresa</p>
				<div className='w-full bg-white rounded-md shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-md space-y-sm md:space-y-md sm:p-lg'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
							LOGIN
						</h1>
						<form
							className='space-y-4 md:space-y-6'
							onSubmit={(e) => handleSubmit(e)}
						>
							<div>
								<label
									htmlFor='email'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Correo
								</label>
								<input
									onChange={onInputChange}
									type='email'
									name='email'
									id='email'
									className='bg-gray-50 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:border-blue-500'
									placeholder='name@company.com'
									required
								/>
							</div>
							<div>
								<label
									htmlFor='password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Contraseña
								</label>
								<input
									onChange={onInputChange}
									type='password'
									name='password'
									id='password'
									placeholder='••••••••'
									className='bg-gray-50 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:border-sky-500 focus:ring-sky-500'
									required
								/>
							</div>
							<div>
								<p className='text-red-700'>{alert}</p>
							</div>
							<div className='flex justify-center'>
								<button
									type='submit'
									className='bg-blue-500 py-2 px-5 rounded font-medium hover:bg-blue-600'
								>
									Ingresar
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
