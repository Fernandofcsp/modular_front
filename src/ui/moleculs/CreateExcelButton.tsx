import excel from "../../../public/assets/icons/excel.png";

interface IExcelButton {
	onClick: () => void,
}

export const CreateExcelButton = (props: IExcelButton) => {
	const { onClick } = props;
	return (
		<button
			onClick={(event) => { event.preventDefault(); onClick() }}
			className={'flex justify-center items-center space-x-md text-buttons focus:outline-none text-white bg-excelButton hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg px-lg py-xsm'}
		>
			<span>{"Exportar a Excel"}</span>
			<img src={excel} className="w-md"></img>
		</button>
	)
}
