import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from "chart.js";
import moment from "moment";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { YearSelector } from "./YearSelector";
import axios from "axios";
import { apiUrl } from "../../../api";
import { toast } from "react-toastify";


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);
export const BonusChart = () => {
	const [selectedYear, setSelectedYear] = useState(moment().year());
	const [months, setMonths] = useState<string[]>([]);
	const [bonus, setBonus] = useState<number[]>([]);

	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedYear])

	const getData = () => {
		axios.get(
			`${apiUrl}/bonus/get-by-year?year=${selectedYear}`,
			{ validateStatus: (status: number) => status < 500 }
		)
			.then(({ data, status }) => {
				if (status != 200) throw ({ ...data, status });
				console.log(selectedYear, data);
				setMonths(data.months);
				setBonus(data.bonus);
			})
			.catch(error => toast.error(error.message + " " + error.status)); 
	}

	const data = {
		labels: months,
		datasets: [
			{
				label: 'Bono por mes',
				data: bonus,
				backgroundColor: 'rgba(75, 192, 192, 0.6)',
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 1,
				pointBorderColor: 'aqua',
				tension: .1
			}
		],
	};

	const options = {
		indexAxis: 'x',
		responsive: true,
		plugins: {
			legend: true,
			title: {
				display: true,
				text: 'Ventas mensuales por año',
			},
		},
	};

	return (
		<div className="flex flex-col w-1/2 space-y-md">
			<div className="flex justify-center space-x-sm items-center">
				<p>Bonos del año</p>
				<YearSelector setYear={setSelectedYear} year={selectedYear} />
			</div>
			<Line data={data} options={options} />
		</div>
	)
}

