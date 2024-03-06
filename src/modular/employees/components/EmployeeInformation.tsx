interface IEmployeeInformation {
	created_date: string, 
	updated_date?: string,
	created_user_id: number | null
}

export const EmployeeInformation = ( props : IEmployeeInformation) => {
	const { created_date, updated_date, created_user_id } = props;
	return (
		<div className="flex flex-col justify-start pb-md">
			<p className="block tracking-wide text-gray-900 text-lg  mb-sm">Fecha de creación: 
				<span className="font-normal ml-sm">{created_date.split('T')[0]}</span>
			</p>
			{
				updated_date &&
				<p className="block tracking-wide text-gray-900 text-lg  mb-sm">Fecha de ultima modificación: 
						<span className="font-normal ml-sm">{updated_date.split('T')[0]}</span>
					</p>
			}
			{
				created_user_id != null &&
					<p className="block tracking-wide text-gray-900 text-lg mb-sm">ID responsable: 
						<span className="font-normal ml-sm">{created_user_id}</span>
					</p>
			}
		</div>
	)
}
