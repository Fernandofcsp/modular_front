import { useState, useEffect } from "react";
import moment from "moment";
import Layout from "../../../ui/layout/Layout";
import { BonusesTable } from "../components/BonusesTable";

import { BonusesData } from "../data";
import { CreateExcelButton } from "../../../ui/moleculs";

export function BonusesPage() {
	const [selectedYear, setSelectedYear] = useState<number | null>(-1);

	const filteredData = selectedYear
		? BonusesData.filter(
			(item) =>
				moment(item.fechaCreacion, "DD/MM/YYYY").year() === selectedYear
		) // Filtramos por año utilizando Moment.js
		: BonusesData;

	const uniqueYears = [
		...new Set(
			BonusesData.map((item) => moment(item.fechaCreacion, "DD/MM/YYYY").year())
		),
	];
	useEffect(() => {

		if (selectedYear == -1) {
			setSelectedYear(uniqueYears[0])
			console.log('Componente cargado con selectedYear:', selectedYear);
			console.log(filteredData.length)

		}

	}, [selectedYear]); // El 

	return (
		<Layout>
			<div>
				
				<div className="flex flex-row space-x-md justify-end">
					<div className="flex justify-end w-full">
						<div className="flex flex-row justify-end space-x-xsm">
							<CreateExcelButton onClick={() => console.log("Creando excel...")} />
						</div>
					</div>
					
				</div>
				<div>
				<select
						id="yearSelect"
						className={"flex flex-2 focus:outline-none px-5 me-2 mb-md justify-center items-center space-x-sm text-buttons rounded-lg px-lg py-xsm"}
						onChange={(e) => setSelectedYear(Number(e.target.value))}
					>

						<option key={"filter"} disabled selected value={-1}>Filtrar</option>
						<option key={"all"} value={0} >Todos</option>
						{uniqueYears.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
				</div>
				{selectedYear !== null ? (
					filteredData.length > 0 ? (
						filteredData.length > 12 ? (
							uniqueYears.map((selectedYear) => (

								<BonusesTable
									selectedYear={selectedYear}
									bonusesData={filteredData.filter(
										(item) =>
											moment(item.fechaCreacion, "DD/MM/YYYY").year() ===
											selectedYear
									)}
								/>

							))
						) : (


							<BonusesTable
								selectedYear={selectedYear}
								bonusesData={filteredData} />

						)
					) : (
						<p className="text-red-600">No hay registros</p>
					)
				) : (
					""
				)}
			</div>
		</Layout>
	);
}
