import { TableHeadItem } from "../../users/moleculs";
import { TableBodyRowBonuse } from "../moleculs/TableBodyRowBonuse";
import { IBonuseData } from "../dataBonuse";


enum TableHeaders {
  first_name = "Nombre",
  daily_salary = "Salario Diario",
  sum_benefits = "Total de Beneficios",
  sum_minutes_delay = "Total de retrasos en minutos",
  absences = "Incidencias",
  base_calculo = "Base del calculo",
  bono = "Bono",
  bono_completo = "Bono completo",
  diferencia = "Diferencia",
 
  
}

interface ITableProps {
  bonuseData: IBonuseData[];

}

export const BonuseTable = ({ bonuseData }: ITableProps) => {

  return (

    <div className="overflow-scroll w-full relative overflow-x-auto shadow-lg sm:rounded-lg h-[400px] mt-md mb-md rounded-lg"
    >
      <table className="overflow-x-hidden text-md text-left text-gray-500 ">
        <caption className="px-md py-sm text-xl font-semibold text-left text-gray-900 bg-white">
          Bono del mes
        </caption>
        <thead className="w-full text-md text-gray-700 uppercase bg-gray-50 sticky top-0">
          <tr>
            {Object.entries(TableHeaders).map((e, i) => {
              return <TableHeadItem key={i} title={e[1]} />;
            })}
          </tr>
        </thead>
        <tbody>
          {bonuseData.map((data, i) => {
            return (
              <TableBodyRowBonuse
                key={i}
                row={data}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
