export const validateUserFields = (
  name: string,
  email: string,
  role: string,
	changePassword : boolean,
  password = "",
  password2 = ""
) => {
  const errors: string[] = [];
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (name.length <= 5) errors.push("Ingresa un nombre válido");
  if (email.length <= 0 || !regex.test(email)) errors.push("Escribe un correo válido");
  if (role === "") errors.push("Debe seleccionar un rol");

	if(changePassword){
		if (password.length <= 0 || password2.length <= 0) errors.push("Revise las contraseñas ingresadas");
		if (password !== password2) errors.push("Las contraseñas no coinciden");
	}
  return errors;
};
