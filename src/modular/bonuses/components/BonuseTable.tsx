import { TableHeadItem } from "../../users/moleculs";
import { TableBodyRowBonuse } from "../moleculs/TableBodyRowBonuse";
import axios from "axios";
import { apiUrl } from "../../../api";
import { useEffect, useState } from "react";
import { IBonuses } from "../interfaces";
import { toast } from "react-toastify";
enum TableHeaders {
  employee = "Empleado",
  absences = "Ausencias",
  total_bonus = "Bono total",
  daily_salary = "Salario diario",
  gain_bonus = "Bono ganado",
  sum_benefits = "Suma de beneficios",
  
}


interface ITableProps {
  selectedYear: number;
  selectedMonth: number;
}

export const BonuseTable = ({ selectedYear, selectedMonth }: ITableProps) => {
  const [bonuses, setBonuses] = useState<IBonuses[]>([]);

  const getBonuse = () => {
    axios
      .get(
        `${apiUrl}/bonus/get-by-month?month=${selectedMonth}&year=${selectedYear}`,
        {
          validateStatus: (status) => status < 500,
        }
      )
      .then(({ data, status }) => {
        if (status != 200) throw { ...data, status };
        setBonuses(data);
      })
      .catch((error) => toast.error(error.message + " " + error.status));
  };

  useEffect(() => {
    getBonuse();
  }, []);
  console.log(selectedYear, selectedMonth);
  return (
    <div className="overflow-scroll w-full relative overflow-x-auto shadow-lg sm:rounded-lg h-[400px] mt-md mb-md rounded-lg">
      <table className="w-full overflow-x-hidden text-md text-left text-gray-500 ">
        <caption className="px-md py-sm text-xl font-semibold text-left text-gray-900 bg-white">
          Bono del mes {selectedMonth} del {selectedYear}
        </caption>
        <thead className="w-full text-md text-gray-700 uppercase bg-gray-50 sticky top-0">
          <tr>
            {Object.entries(TableHeaders).map((e, i) => {
              return <TableHeadItem key={i} title={e[1]} />;
            })}
          </tr>
        </thead>
        <tbody>
          {bonuses.map((bonus, i) => {
            return bonus.details.map((detail, j) => {
              return (
                <TableBodyRowBonuse
                  key={`${i}-${j}`}
                  id={detail.id}
                  employee={detail.employee}
                  absences={detail.absences}
                  bonus={detail.bonus}
                  daily_salary={detail.daily_salary}
                  gain_bonus={detail.gain_bonus}
                  sum_benefits={detail.sum_benefits}
                  total_bonus={detail.total_bonus}
                />
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
};
