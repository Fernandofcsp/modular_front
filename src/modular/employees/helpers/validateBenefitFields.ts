export const validateBenefitFields = (nameBenefit: string, quantity: number) => {
	const errors: string[] = [];

	if(nameBenefit.length < 2) errors.push("Inserte un nombre válido al beneficio");
	if(quantity <= 0) errors.push("Inserte una cantidad válida");

	return errors;
}