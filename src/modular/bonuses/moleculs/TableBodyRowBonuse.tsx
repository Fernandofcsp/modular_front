import { IBonuseDetail } from "../interfaces";

export const TableBodyRowBonuse = (props: IBonuseDetail) => {
  const {employee, absences, daily_salary, gain_bonus, sum_benefits, total_bonus} = props;
  return (
    <tr className="bg-white border-b text-center">
      
      <td
        scope="row"
        className="py-md px-md font-medium text-gray-900 whitespace-nowrap "
      >
        {employee.first_name + " " + employee.last_name}
      </td>

      <td className="bg-white border-b">
        {absences}
      </td>
      <td className="bg-white border-b">
        ${new Intl.NumberFormat().format(total_bonus)}
      </td>
      <td className="bg-white border-b">  
      ${new Intl.NumberFormat().format(daily_salary)}</td>
      <td className="bg-white border-b"> 
        ${new Intl.NumberFormat().format(gain_bonus)}</td>
      <td className="bg-white border-b">
        ${new Intl.NumberFormat().format(sum_benefits)}
      </td>
      
     
    </tr>
  );
};
