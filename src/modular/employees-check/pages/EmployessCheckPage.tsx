import { useEffect, useState } from "react";
import Layout from "../../../ui/layout/Layout";
import { InconsistenciasTable, NewInconsistencia } from "../components";
import { EmployeesSelector, NewInconsistencyButton } from "../moleculs";
import { selectedUserStore } from "../../../store/selectedUserStore";


export const EmployessCheckPage = () => {
	const {id: idSelectedUser, setId} = selectedUserStore((state) => state);
	const [employeeId, setEmployeeId] = useState(idSelectedUser);
	console.log(employeeId)
	const [showNewInconsistencia, setShowNewInconsistencia] = useState(false);

	useEffect(() => {
		setId(employeeId);
	}, [ employeeId ])
	
	return (
		<Layout>
			<div className="flex flex-col justify-end">
				<EmployeesSelector employee_id={employeeId} setId={setEmployeeId} />
				{
					employeeId !== -1 && <NewInconsistencyButton setShowNewInconsistencia={setShowNewInconsistencia} showInconsistencia={showNewInconsistencia} />
				}
				{
					employeeId !== -1 && <InconsistenciasTable id={employeeId} />
				}
				{
					showNewInconsistencia ?
						employeeId === -1 ? <p className="text-red-600 text-end mb-sm mt-md">Por favor seleccione un empleado</p>
							: <NewInconsistencia setShow={setShowNewInconsistencia}/>
						: ""
				}
			</div>
		</Layout>
	)
}
