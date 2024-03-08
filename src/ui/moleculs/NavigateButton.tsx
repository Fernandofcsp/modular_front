
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
			className={"flex focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 px-lg py-sm justify-center items-center space-x-sm text-buttons rounded-lg"}
		>
			<span>{ title }</span>
			{
				image && <img src={image} className="w-md "></img>
			}
		</button>
	) 
}
