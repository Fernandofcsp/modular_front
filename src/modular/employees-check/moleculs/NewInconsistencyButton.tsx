
interface IInconsistencyButon {
	showInconsistencia : boolean,
	setShowNewInconsistencia : ( value : boolean ) => void
}

export const NewInconsistencyButton = ( { setShowNewInconsistencia } : IInconsistencyButon ) => {
	return (
			<button className="focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 px-5 py-2.5 me-2 mb-2 flex justify-center items-center space-x-xsm text-buttons rounded-lg px-lg py-xsm me-xsm mb-xsm" onClick={() => setShowNewInconsistencia(true)}>Crear inconsistencia</button>
	)
}
