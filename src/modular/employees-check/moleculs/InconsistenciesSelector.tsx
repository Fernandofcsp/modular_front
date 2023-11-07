
interface IInconsistenciesSelector {
	inconsistency : number,
	setInconsistency : ( inconsistency : number ) => void
}

enum TiposInconsistencias {
	falta = "Falta",
	retardo = "Retardo",
	vacaciones = "Vacaciones",
	incapacidad = "Incapacidad"
}


export const InconsistenciesSelector = ( { inconsistency, setInconsistency } : IInconsistenciesSelector) => {
	return (
		<div className="flex flex-col items-start px-sm w-full mb-sm md:mb-0">
			<label className="uppercase font-bold pb-sm">Tipo de inconsistencia</label>
			<select className="focus:bg-white bg-gray-50 text-gray-800 text-md rounded-md block w-full p-sm" value={inconsistency} onChange={({ target }) => setInconsistency(parseInt(target.value))}>
				<option value={-1}>Por favor seleccione</option>
				{
					Object.entries(TiposInconsistencias).map((e, i) => {
						return <option key={i} value={i}>{e[1]}</option>
					})
				}
			</select>
		</div>
	)
}
