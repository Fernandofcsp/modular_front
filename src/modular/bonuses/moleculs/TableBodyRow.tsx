import { Link } from "react-router-dom";


interface IBonusesRow {
	mes: string;
    numeroMes: number;
    anio: number;
    fechaCreacion: string;
    totalVentas: number;
    totalBonos: number;
}

export const TableBodyRow = (props: IBonusesRow) => {
	const { mes, numeroMes, anio, fechaCreacion, totalVentas, totalBonos } = props;
	return (
		<tr className="bg-white border-b">
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{numeroMes}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{mes}
			</th>
			<td className="px-md py-md">
				{anio}
			</td>
			<td className="px-md py-md">
				{fechaCreacion}
			</td>
            <td className="px-md py-md">
				${new Intl.NumberFormat().format(totalVentas)}
			</td>
            <td className="px-md py-md">
				${new Intl.NumberFormat().format(totalBonos)}
			</td>
			<td className="px-md py-md">
				<Link to={`/bonuse`} state={anio}><p className="text-blue-600">Más</p></Link>
			</td>
		</tr>
	)
}
