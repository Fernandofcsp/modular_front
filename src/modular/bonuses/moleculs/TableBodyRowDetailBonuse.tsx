
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

enum TableHeaders {
    bonuseDetail_id = "ID Bono",
    bonuse_id = "ID Bono Mes",
    employee_id = "ID Empleado",
    first_name = "Nombre",
    last_name = "",
    daily_salary = "Salario Diario",
    sum_benefits = "Total de Beneficios",
    sum_minutes_delay = "Total de retrasos en minutos",
    absences = "Incidencias",
    base_calculo = "Base del calculo",
    bono = "Bono recibido",
    bono_completo = "Bono completo",
    diferencia = "Diferencia",
    date = "Fecha",
    created_date = "Fecha de Creacion",
    updated_date = "Decha de Actualización",
    created_user_id = "ID Usuario que genero el bono",
    updated_user_id = "ID de usuario que actualizo el",
}

export const TableBodyRowDetailBonuse = (props: IBonuseRow) => {
	const { bonuseDetail_id, bonuse_id, employee_id, first_name, last_name, 
        daily_salary, sum_benefits, sum_minutes_delay, absences, base_calculo,
        bono, bono_completo, diferencia, date, created_date, updated_date,
        created_user_id, updated_user_id } = props;

        
	return (
        <td>
        <th rowSpan={1} colSpan={2}>
        <td >ID BONO</td>
        <td className="bg-white border-b" >{bonuseDetail_id}</td>
        </th>
        <th rowSpan={1} colSpan={2}>
        <td className="bg-white border-b" >ID BONO MES</td>
        <td className="bg-white border-b">{bonuse_id}</td>
        </th>
        <tr className="bg-white border-b">
            {employee_id}
        </tr>
        <tr className="bg-white border-b">
            {first_name}
        </tr>
        <tr className="bg-white border-b">
            {last_name}
        </tr>
        <tr className="bg-white border-b">
        ${new Intl.NumberFormat().format(daily_salary)}
        </tr>
        <tr className="bg-white border-b">
        ${new Intl.NumberFormat().format(sum_benefits)}
        </tr>
        <tr className="bg-white border-b">
            {sum_minutes_delay}
        </tr>
        <tr className="bg-white border-b">
            {absences}
        </tr>
        <tr className="bg-white border-b">
        ${new Intl.NumberFormat().format(base_calculo)}
        </tr>
        <tr className="bg-white border-b">
        ${new Intl.NumberFormat().format(bono)}
        </tr>
        <tr className="bg-white border-b">
        ${new Intl.NumberFormat().format(bono_completo)}
        </tr>
        <tr className="bg-white border-b">
        ${new Intl.NumberFormat().format(diferencia)}
        </tr>
        <tr className="bg-white border-b">
            {date}
        </tr>
        <tr className="bg-white border-b">
            {created_date}
        </tr>
        <tr className="bg-white border-b">
            {updated_date}
        </tr>
        <tr className="bg-white border-b">
            {created_user_id}
        </tr>
        <tr className="bg-white border-b">
            {updated_user_id}
        </tr>
        
        </td>
        
	)
}
