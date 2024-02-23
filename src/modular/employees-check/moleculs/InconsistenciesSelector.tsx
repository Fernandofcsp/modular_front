
interface IInconsistenciesSelector {
	inconsistency : number,
	setInconsistency : ( inconsistency : number ) => void,
	disabled ?: boolean
}

enum TiposInconsistencias {
	falta = "Falta", //0
	retardo = "Retardo", //1
	vacaciones = "Vacaciones", //2
	incapacidad = "Incapacidad" //3
}


export const InconsistenciesSelector = ( { inconsistency, setInconsistency, disabled } : IInconsistenciesSelector) => {
	return (
		<div className="flex flex-col mb-sm space-y-sm">
			<label className="uppercase text-lg">Tipo de inconsistencia</label>
			<select disabled={disabled} className="w-1/2 focus:bg-white bg-gray-50 text-gray-800 text-lg rounded-md p-sm" value={inconsistency} onChange={({ target }) => setInconsistency(parseInt(target.value))}>
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
