
interface IExitTypeSelector {
	typeExit: number,
	setTypeExit: (typeExit: number) => void
}

export const TypeExitSelect = ({ typeExit, setTypeExit } : IExitTypeSelector) => {
	return (
		<div className="flex flex-col items-start px-sm w-full mb-sm md:mb-0">
			<label className="uppercase font-bold pb-sm">Tipo de entrada</label>
			<select className="focus:bg-white bg-gray-50 text-gray-800 text-md rounded-md block w-full p-sm" value={typeExit} onChange={({ target }) => setTypeExit(parseInt(target.value))}>
				<option value={-1}>Por favor seleccione</option>
				<option value={1}>Entrada</option>
				<option value={2}>Comida</option>
			</select>
		</div>
	)
}
