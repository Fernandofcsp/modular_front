import { Link } from "react-router-dom";


interface IBonusesRow {
    bonuses_id: string;
	mes: string;
    numeroMes: number;
    anio: number;
    fechaCreacion: string;
    totalVentas: number;
    totalBonos: number;
}

export const TableBodyRow = (props: IBonusesRow) => {
	const { bonuses_id, mes, numeroMes, fechaCreacion, totalVentas, totalBonos } = props;
	return (
		<tr className="bg-white border-b">
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{numeroMes}
			</th>
			<th scope="row" className="px-md py-md font-medium text-gray-900 whitespace-nowrap ">
				{mes}
			</th>
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
				<Link to={`/bonuse`} state={bonuses_id}><p className="text-blue-600">Más</p></Link>
			</td>
		</tr>
	)
}
