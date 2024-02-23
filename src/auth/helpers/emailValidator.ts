const validateEmail = (email: string) => {
  // Define our regular expression.
  const regExp = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  // Using test we can check if the text match the pattern
  if (regExp.test(email)) return true;

  return false;
};

export const validateLoginFields = ( email: string, password: string ) => {
	const errors: string[] = [];
	if(password.length <= 0 || email.length <= 0){ errors.push("Complete todos los campos") }
	if(!validateEmail(email)) errors.push("Ingresa un email válido");

	return errors;
} 
