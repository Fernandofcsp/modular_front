
interface IBackButton {
	onClick : () => void,
	title : string,
	image? : string,
}

export const NavigateButton = (props : IBackButton) => {
	const { title, onClick, image } = props;
	return (
		<button
			onClick={() => {
				onClick();
			}}
			className={"focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 px-5 py-2.5 me-2 mb-2 flex justify-center items-center space-x-xsm text-buttons rounded-lg px-lg py-xsm me-xsm mb-xsm"}
		>
			<span>{ title }</span>
			{
				image && <img src={image} className="w-md "></img>
			}
		</button>
	)
}
