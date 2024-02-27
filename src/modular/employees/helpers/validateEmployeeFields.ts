import moment from "moment";

export const validateEmployeeFields = (
	firstName: string,
	lastName: string,
	dailySalary: number,
	admisionDate: string
) => {
	const errors: string[] = [];

	if(firstName.length <= 3) errors.push("Ingrese un nombre válido");
	if(lastName.length <= 3) errors.push("Ingrese un primer apellido válido");
	if(dailySalary <= 0) errors.push("Ingrese un salario diario válido");
	if(admisionDate === "") 
		errors.push("Seleccione una fecha");
	else
		if(moment(admisionDate).isAfter(moment())) errors.push("La fecha no debe ser del futuro");
	return errors;
}