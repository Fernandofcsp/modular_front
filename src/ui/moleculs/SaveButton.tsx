import { ISaveButton } from "../interfaces/UIInterfaces";
import save from "../../../public/assets/icons/salvar.png";


export const SaveButton = (props: ISaveButton) => {
	const { title, onClick } = props;
	return (
		<button
			onClick={(event) => { event.preventDefault(); onClick(event) }}
			className={'flex justify-center items-center space-x-xsm text-buttons focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg px-lg py-xsm'}
		>
			<span>{title}</span>
			<img src={save} className="w-md "></img>
		</button>
	)
}
