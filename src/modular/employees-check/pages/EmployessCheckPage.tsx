import { useEffect, useState } from "react";
import Layout from "../../../ui/layout/Layout";
import { InconsistenciasTable, NewInconsistencia } from "../components";
import { EmployeesSelector, NewInconsistencyButton } from "../moleculs";
import { selectedUserStore } from "../../../store/selectedUserStore";
import { CreateExcelButton, NavigateButton } from "../../../ui/moleculs";
import { useNavigate } from "react-router-dom";


export const EmployessCheckPage = () => {
	const { id: idSelectedUser, setId } = selectedUserStore((state) => state);
	const [employeeId, setEmployeeId] = useState(idSelectedUser);
	const [showNewInconsistencia, setShowNewInconsistencia] = useState(false);

	useEffect(() => {
		setId(employeeId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [employeeId])

	return (
		<Layout>
			<div className="flex flex-col justify-end">
				<div className="flex flex-col space-y-md">
					<div className="flex justify-end w-full">
						<div className="flex flex-col justify-end space-y-sm">
							<EmployeesSelector employee_id={employeeId} setId={setEmployeeId} />
							{
								employeeId !== -1 && (
									<>
										<CreateExcelButton onClick={() => console.log("Creando excel...")} />
										<NewInconsistencyButton setShowNewInconsistencia={setShowNewInconsistencia} showInconsistencia={showNewInconsistencia} />
									</>
								) 
							}
						</div>
					</div>

				</div>
				{
					showNewInconsistencia ? <NewInconsistencia idEmployee={idSelectedUser} setShow={setShowNewInconsistencia} />
						: employeeId !== -1 && <InconsistenciasTable id={employeeId} />
				}
			</div>
		</Layout>
	)
}
