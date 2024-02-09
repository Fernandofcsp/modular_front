import moment from "moment";

export const validateAccountFields = (concept: string, reference: string, quantity: number, date: string) => {
	const errors = [];
	if(concept.length <= 0)
		errors.push("Debe escribir algo en concepto");
	if(reference.length<= 0)
		errors.push("Debe escribir algo en referencia");
	if(quantity == 0)
		errors.push("La cantidad de la cuenta debe de ser diferente de 0");
	if(moment(date).isAfter() || date === "")
		errors.push("Ingrese una fecha válida, la fecha no puede ser del futuro");

	return errors;
}