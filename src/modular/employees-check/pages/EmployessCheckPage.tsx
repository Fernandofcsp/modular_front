import { useState } from "react";
import Layout from "../../../ui/layout/Layout";
import { InconsistenciasTable, NewInconsistencia } from "../components";
import { EmployeesSelector, NewInconsistencyButton } from "../moleculs";


export const EmployessCheckPage = () => {
	const [employeeId, setEmployeeId] = useState(-1);
	const [showNewInconsistencia, setShowNewInconsistencia] = useState(false);

	return (
		<Layout>
			<div className="flex flex-col justify-end">
				<NewInconsistencyButton setShowNewInconsistencia={ setShowNewInconsistencia } showInconsistencia={ showNewInconsistencia } />
				<EmployeesSelector id={employeeId} setId={setEmployeeId} />
				{
					employeeId !== -1 && <InconsistenciasTable id={employeeId} />
				}
				{
					showNewInconsistencia ?
						employeeId === -1 ? <p className="text-red-600 text-end mb-sm">Por favor seleccione un empleado</p>
							: <NewInconsistencia setShow={setShowNewInconsistencia}/>
						: ""
				}
			</div>
		</Layout>
	)
}