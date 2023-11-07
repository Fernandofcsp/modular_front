interface IEmployeeInformation {
	created_date: string, 
	updated_date: string,
	created_user_id: number
}

export const EmployeeInformation = ( props : IEmployeeInformation) => {
	const { created_date, updated_date, created_user_id } = props;
	console.log(created_date, updated_date, created_user_id);
	return (
		<div className="flex justify-between pb-md">
			<p className="block uppercase tracking-wide text-gray-900 text-lg font-bold mb-sm">Fecha de creación: 
				<span className="font-normal ml-sm">{created_date.split("T")[0]}</span>
			</p>
			<p className="block uppercase tracking-wide text-gray-900 text-lg font-bold mb-sm">Fecha de ultima modificación: 
				<span className="font-normal ml-sm">{updated_date.split("T")[0]}</span>
			</p>
			<p className="block uppercase tracking-wide text-gray-900 text-lg font-bold mb-sm">ID responsable: 
				<span className="font-normal ml-sm">{created_user_id}</span>
			</p>
		</div>
	)
}
