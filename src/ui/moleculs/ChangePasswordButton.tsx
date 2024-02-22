import edit from "../../../public/assets/icons/editar.png";
import { IChangePasswordButton } from "../interfaces/UIInterfaces";



export const ChangePasswordButton = (props: IChangePasswordButton) => {
	const { title, onClick } = props;
	return (
		<button
			type="button"
			onClick={() => {
				onClick(true);
			}}
			className='bg-gray-700 hover:bg-gray-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm justify-center space-x-xsm text-buttons focus:outline-none focus:ring-1 focus:ring-gray-300 me-xsm mb-xsm'
		>
			<span>{title}</span>
			<img
				src={edit}
				className='w-md'
			></img>
		</button>
	)
}
