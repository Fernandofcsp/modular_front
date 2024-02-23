import { IEditButton } from "../interfaces/UIInterfaces";
import edit from "../../../public/assets/icons/editar.png";


export const EditButton = (props: IEditButton) => {
	const { title, onClick } = props;
	return (
		<button
			onClick={(event) => { event.preventDefault(); onClick(false) }}
			className={'flex justify-center items-center space-x-xsm text-buttons focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg px-lg py-xsm me-xsm mb-xsm'}
		>
			<span>{ title }</span>
			<img src={edit} className="w-md "></img>
		</button>
	)
}
