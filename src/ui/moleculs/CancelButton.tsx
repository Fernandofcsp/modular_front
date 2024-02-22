import { ICancelButton } from "../interfaces/UIInterfaces";
import cancel from "../../../public/assets/icons/cancel.png";


export const CancelButton = (props: ICancelButton) => {
	const { title, onClick } = props;
	return (
		<button
			onClick={(event) => { event.preventDefault(); onClick() }}
			className={'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 px-5 py-2.5 me-2 mb-2 flex justify-center items-center space-x-xsm text-buttons rounded-lg px-lg py-xsm me-xsm mb-xsm'}
		>
			<span>{title}</span>
			<img src={cancel} className="w-md "></img>
		</button>
	)
}
