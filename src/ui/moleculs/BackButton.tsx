import back from "../../../public/assets/icons/back.png";

interface IBackButton {
	onClick : () => void
}

export const BackButton = (props : IBackButton) => {
	const { onClick } = props;
	return (
		<button
			onClick={() => {
				onClick();
			}}
			className={"bg-blue-500 hover:bg-blue-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm"}
		>
			<span>Volver</span>
			<img src={back} className="w-md "></img>
		</button>
	)
}
