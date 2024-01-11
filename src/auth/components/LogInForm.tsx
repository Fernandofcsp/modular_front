
interface ILogInForm {
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
	onInputChange: (event: string) => void,
	alert: string,
}

export const LogInForm = (props: ILogInForm) => {
	const { handleSubmit, onInputChange, alert } = props;
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
					className='bg-gray-50 text-gray-900 text-lg rounded-lg block w-full p-sm '
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
					className='bg-gray-50 text-gray-900 text-lg rounded-lg block w-full p-sm'
					required
				/>
			</div>
			<div>
				<p className='font-bold text-red-600'>{alert}</p>
			</div>
			<div className='flex justify-center'>
				<button
					type='submit'
					className='bg-blue-500 py-xsm px-md rounded font-medium hover:bg-blue-600'
				>
					Ingresar
				</button>
			</div>
		</form>
	)
}
