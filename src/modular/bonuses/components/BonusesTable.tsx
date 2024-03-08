import { TableHeadItem } from "../../users/moleculs";
import { TableBodyRow } from "../moleculs";
import { IBonuses } from "../interfaces";
import { apiUrl } from "../../../api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";

enum TableHeaders {
  month = "Mes",
  year = "Año",
  total_sales = "Ventas",
  total_bonus = "Bono",
  mas = "Más",
}

interface ITableProps {
  selectedYear: number;
}

export const BonusesTable = ({ selectedYear }: ITableProps) => {
  const [bonuses, setBonuses] = useState<IBonuses[]>([]);

  useEffect(() => {
    getBonuses();
  }, [selectedYear]);

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
    </div>
  );
};
