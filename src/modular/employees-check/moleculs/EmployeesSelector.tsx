
interface IEmployeeSelector {
	id : number,
	setId : ( id : number ) => void
}

export const EmployeesSelector = ( { id, setId } : IEmployeeSelector ) => {
	//Hacer consulta a la api para traer los empleados
	const employees = [
		{
			id : 1,
			name: "Francisco Saldivar"
		}, 
		{
			id: 2,
			name: "Angel Zapata"
		}, 
		{
			id: 3,
			name: "Fernando Sandoval"
		}, 
	]
	
	return (
		<div className="flex items-end justify-end">
			<select className="py-sm px-md rounded-md" value={ id } onChange={ ({ target }) => setId(parseInt(target.value)) }>
				<option defaultChecked value={-1}>Seleccione</option>
				{
					employees.map(employee => {
						return <option key={employee.id} value={ employee.id }>{ employee.name }</option>
					})
				}

			</select>
		</div>
	)
}
