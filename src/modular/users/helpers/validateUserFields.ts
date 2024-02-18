export const validateUserFields = (
  name: string,
  email: string,
  role: string,
  password: string,
  password2: string
) => {
  const errors: string[] = [];
	const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  if (name.length <= 5) errors.push("Ingresa un nombre válido");
  if (email.length <= 0 || regex.test(email)) errors.push("Escribe un correo válido");
  if (role === "") errors.push("Debe seleccionar un rol");
  if (password.length <= 0 || password2) errors.push("Revise las contraseñas ingresadas");
  if (password !== password2) errors.push("Las contraseñas no coinciden");
  return errors;
};