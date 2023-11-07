
interface IInconsistencyButon {
	showInconsistencia : boolean,
	setShowNewInconsistencia : ( value : boolean ) => void
}

export const NewInconsistencyButton = ( { setShowNewInconsistencia, showInconsistencia } : IInconsistencyButon ) => {
	return (
		<div className="flex justify-end pb-sm">
			<button className="text-white text-lg uppercase bg-blue-500 hover:font-semibold px-md py-sm rounded-md hover:bg-blue-600" onClick={() => setShowNewInconsistencia(!showInconsistencia)}>Nueva inconsistencia</button>
		</div>
	)
}
