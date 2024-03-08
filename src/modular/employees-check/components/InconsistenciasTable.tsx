import axios from "axios";
import { EmployeesTableHeadRow, EmployeesTableRow } from "../moleculs";
import { apiUrl } from "../../../api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { IInconsistency } from "../interfaces/interfaces";
import * as XLSX from 'xlsx';
import { CreateExcelButton } from "../../../ui/moleculs";

enum TableHeaders {
	tipo = "Tipo",
	fechaInicio = "Fecha de inicio",
	fechaFinal = "Fecha de regreso",
	tiempo = "Tiempo",
	opciones = "Opciones"
}

interface IInconsistenciasTable {
	id : number
}

export const InconsistenciasTable = ({ id } : IInconsistenciasTable) => {
	const [inconsistencies, setInconsistencies] = useState<IInconsistency[]>([]);

	const getInconsistencies = () => {
		axios.get(
			`${apiUrl}/inconcistences/get-by-employee/?employee=${id}`,
			{ validateStatus: (status) => status < 500 }
		)
			.then(({ data, status }) => {
				if (status != 200) throw ({ ...data, status });
				setInconsistencies(data.inconcistences);
			})
			.catch(error => toast.error(error.message + " " + error.status));
	}

	useEffect(() => {
		getInconsistencies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id])
	
	const exportarAExcel = () => {
		const wb = XLSX.utils.book_new();
		const ws = XLSX.utils.json_to_sheet(inconsistencies);
		XLSX.utils.book_append_sheet(wb, ws, 'Datos');
		XLSX.writeFile(wb, `file.xlsx`);
	};

	return (
		<div className="flex flex-col space-y-md overflow-x-auto shadow-lg sm:rounded-lg mt-sm justify-end items-start">
			<div className="flex flex-col ite">
				<CreateExcelButton onClick={() => exportarAExcel()}/>
			</div>
			{
				inconsistencies.length > 0 ?
				<table className="w-full text-md text-left text-gray-500">
					<thead className="text-md text-gray-700 uppercase bg-gray-50 sticky top-0">
						<tr>
							{
								Object.entries(TableHeaders).map((e, i) => {
									return <EmployeesTableHeadRow key={i} title={e[1]} />
								})
							}
						</tr>
					</thead>
					<tbody>
						{
							inconsistencies.map((e, i) => <EmployeesTableRow key={i} id={ e.id } minutes={ e.minutes } tipo={ e.type } fechaFin={ e.final_date } fechaInicio={ e.initial_date } /> )
						}
					</tbody>
				</table>
				: <p className="my-lg mx-md">Aún no existen inconsistencias registradas para este empleado</p>
			}
		</div>
	)
}
