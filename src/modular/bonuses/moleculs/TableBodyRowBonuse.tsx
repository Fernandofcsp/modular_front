interface IBonuseRow {
  bonuseDetail_id: string;
  bonuse_id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  daily_salary: number;
  sum_benefits: number;
  sum_minutes_delay: number;
  absences: number;
  base_calculo: number;
  bono: number;
  bono_completo: number;
  diferencia: number;
  date: string;
  created_date: string;
  updated_date: string;
  created_user_id: string;
  updated_user_id: string;
}
interface IRow {
  row: IBonuseRow;
}

export const TableBodyRowBonuse = (props: IRow) => {
  const { row } = props;
  return (
    <tr className="bg-white border-b">
      
      <td
        scope="row"
        className="px-md py-md font-medium text-gray-900 whitespace-nowrap "
      >
        {row.first_name + " " + row.last_name}
      </td>

      <td className="bg-white border-b">
        ${new Intl.NumberFormat().format(row.daily_salary)}
      </td>
      <td className="bg-white border-b">
        ${new Intl.NumberFormat().format(row.sum_benefits)}
      </td>
      <td className="bg-white border-b">{row.sum_minutes_delay}</td>
      <td className="bg-white border-b">{row.absences}</td>
      <td className="bg-white border-b">
        {row.base_calculo}
      </td>
      <td className="bg-white border-b">
        ${new Intl.NumberFormat().format(row.bono)}
      </td>
      <td className="bg-white border-b">
        ${new Intl.NumberFormat().format(row.bono_completo)}
      </td>
      <td className="bg-white border-b">
        ${new Intl.NumberFormat().format(row.diferencia)}
      </td>
    </tr>
  );
};
