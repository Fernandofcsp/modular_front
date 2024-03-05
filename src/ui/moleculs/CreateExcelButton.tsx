import excel from "../../../public/assets/icons/excel.png";

interface IExcelButton {
	onClick: () => void,
}

export const CreateExcelButton = (props: IExcelButton) => {
	const { onClick } = props;
	return (
		<button
			onClick={(event) => { event.preventDefault(); onClick() }}
			className={'flex flex-2 focus:outline-none text-white bg-excelButton hover:bg-green-800 focus:ring-4 focus:ring-blue-300 px-5 py-2.5 me-2 mb-2 justify-center items-center space-x-sm text-buttons rounded-lg px-lg py-xsm'}
		>
			<span>{"Exportar a Excel"}</span>
			<img src={excel} className="w-md"></img>
		</button>
	)
}
