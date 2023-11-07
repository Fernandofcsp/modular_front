import React from 'react';

interface IFormButtons {
	save: (e: React.SyntheticEvent) => void,
	cancel: (e: React.SyntheticEvent) => void
}

export const FormButtons = ( { save, cancel } : IFormButtons ) => {
	return (
		<div className="flex justify-end py-sm">
			<button onClick={ (event) => cancel(event) } className="text-white text-lg uppercase bg-red-500 hover:font-semibold px-md py-xsm rounded-md hover:bg-red-600 mr-sm">Cancelar</button>
			<button onClick={ (event) => save(event) } className="text-white text-lg uppercase bg-green-500 hover:font-semibold px-md py-xsm rounded-md hover:bg-green-600">Guardar</button>
		</div>
	)
}
