import { TableHeadItem } from "../../users/moleculs";
import { TableBodyRowDetailBonuse } from "../moleculs/TableBodyRowDetailBonuse";
import {IBonuseDetailData} from "../dataDetailBonuse"



interface ITableProps{
	bonuseDetailData: IBonuseDetailData[];
}


export const BonuseDetailTable = ({bonuseDetailData} : ITableProps) => {
	
	return (
		<div className="relative overflow-x-auto shadow-lg sm:rounded-lg h-[400px] mt-md mb-md rounded-lg">
			<table className="w-full relative text-md text-left text-gray-500 ">
				<caption className="px-md py-sm text-xl font-semibold text-left text-gray-900 bg-white">
					Datos
				</caption>
				
				<tbody>
					{
						bonuseDetailData.map((data, i) => {
							return <TableBodyRowDetailBonuse
								key={i}
                                bonuseDetail_id={data.bonuseDetail_id}
                                bonuse_id={data.bonuse_id}
                                employee_id={data.employee_id}
                                first_name={data.first_name}
                                last_name={data.last_name}
                                daily_salary={data.daily_salary}
                                sum_benefits={data.sum_benefits}
                                sum_minutes_delay={data.sum_minutes_delay}
                                absences={data.absences}
                                base_calculo={data.absences}
                                bono={data.bono}
                                bono_completo={data.bono_completo}
                                diferencia={data.diferencia}
                                date={data.date}
                                created_date={data.created_date}
                                updated_date={data.updated_date}
                                created_user_id={data.created_user_id}
                                updated_user_id={data.updated_user_id}
							/>
						})
					}
				</tbody>
			</table>
		</div>
	)
}
