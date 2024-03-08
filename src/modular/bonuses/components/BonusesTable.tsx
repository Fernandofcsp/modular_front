import { TableHeadItem } from "../../users/moleculs";
import { TableBodyRow } from "../moleculs";
import { IBonuses } from "../interfaces";
import { apiUrl } from "../../../api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from 'xlsx';
import { CreateExcelButton } from "../../../ui/moleculs";

enum TableHeaders {
	month = "Mes",
	year = "Año",
	total_sales = "Ventas",
	total_bonus = "Bono",
	mas = "Más",
}


export const BonusesTable = () => {
	const [selectedYear, setSelectedYear] = useState(2024);
	const [bonuses, setBonuses] = useState<IBonuses[]>([]);

	useEffect(() => {
		getBonuses();
	}, [selectedYear]);

	const exportarAExcel = () => {
		const array : any = [];
		bonuses.map(bonuse => {
			array.push({
				'Month': bonuse.bonus.month,
				'Year': bonuse.bonus.year,
				"Porcentage": bonuse.bonus.porcentage,
				"Total bonus": bonuse.bonus.total_bonus,
				"Total sales": bonuse.bonus.total_sales
			})
		})
		const wb = XLSX.utils.book_new();
		const ws = XLSX.utils.json_to_sheet(array);
		XLSX.utils.book_append_sheet(wb, ws, 'Datos');
		XLSX.writeFile(wb, `file.xlsx`);
	};

	const getBonuses = () => {
		axios
			.get(`${apiUrl}/bonus/get-by-year?year=${selectedYear}`, {
				validateStatus: (status) => status < 500,
			})
			.then(({ data, status }) => {
				if (status != 200) throw { ...data, status };

				setBonuses(data);
			})
			.catch((error) => toast.error(error.message + " " + error.status));
	};

	return (
		<div className="mt-md">
			<div className="flex justify-end space-x-sm">
				<select
					id="yearSelect"
					className={
						"flex focus:outline-none justify-center items-center space-x-sm text-buttons rounded-lg px-lg py-xsm"
					}
					onChange={(e) => setSelectedYear(Number(e.target.value))}
					value={selectedYear}
				>
					<option selected value={2021}>
						2021
					</option>
					<option selected value={2022}>
						2022
					</option>
					<option selected value={2023}>
						2023
					</option>
					<option selected value={2024}>
						2024
					</option>
				</select>
				{bonuses.length > 0 && <CreateExcelButton onClick={() => exportarAExcel()} />}
			</div>
			{
				bonuses.length > 0 ?
					<div className="relative overflow-x-auto shadow-lg sm:rounded-lg h-[400px] mt-md mb-md rounded-lg">
						<table className="w-full relative text-md text-left text-gray-500 ">
							<caption className="px-md py-sm text-xl font-semibold text-left text-gray-900 bg-white">
								Bonos del {selectedYear}
							</caption>
							<thead className="text-md text-gray-700 uppercase bg-gray-50 sticky top-0">
								<tr>
									{Object.entries(TableHeaders).map((e, i) => {
										return <TableHeadItem key={i} title={e[1]} />;
									})}
								</tr>
							</thead>
							<tbody>
								{bonuses.map((bonus, i) => {
									return (
										<TableBodyRow
											key={i}
											id={bonus.bonus.id}
											month={bonus.bonus.month}
											porcentage={bonus.bonus.porcentage}
											total_bonus={bonus.bonus.total_bonus}
											total_sales={bonus.bonus.total_sales}
											year={bonus.bonus.year}
										/>
									);
								})}
							</tbody>
						</table>
					</div> : <p className="text-end my-md">No hay bonos para el año seleccionado</p>
			}
		</div>
	);
};
