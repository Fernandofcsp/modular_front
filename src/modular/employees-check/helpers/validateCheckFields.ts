import moment from "moment";

interface IValidateFields {
  errors: string[];
  reset: boolean;
}

export const validateCheckFields = (
  inconsistencyType: string,
  initialDate: string,
  minutes: number,
  endDate?: string | undefined
): IValidateFields => {
  const errors = [];
  let reset = false;

  switch (inconsistencyType) {
		case "Seleccione":
			errors.push("Debes seleccionar una inconsistencia y completar los campos")
			break;
    case "Falta":
      if (initialDate === "") errors.push("Debes seleccionar una fecha");

      if (moment(initialDate).isAfter(moment())) {
        errors.push("La fecha no debe de ser del futuro");
        reset = true;
      }

      if (moment(initialDate).day() === 6 || moment(initialDate).day() === 0) {
        errors.push("No se capturan faltas en fin de semana");
        reset = true;
      }
      break;
    case "Retardo":
      if (initialDate === "") errors.push("Debes seleccionar una fecha válida");
      if (minutes <= 0) errors.push("Ingrese un numero de minutos correcto");
      if (moment(initialDate).isSameOrAfter(moment())) {
        errors.push("La fecha no puede ser del futuro");
        reset = true;
      }
      break;
    case "Vacaciones":
      if (initialDate === "" || endDate === "")
        errors.push("Debes seleccionar fechas válidas");
      if (moment(initialDate).isAfter(moment(endDate))) {
        errors.push("La fecha inicial debe ser menor a la final");
        reset = true;
        break;
      }
      break;
    case "Incapacidad":
      if (initialDate === "" || endDate === "")
        errors.push("Debes seleccionar fechas válidas");
      if (moment(initialDate).isAfter(moment(endDate))) {
        errors.push("La fecha inicial debe ser menor a la final");
        reset = true;
        break;
      }
      break;
    default:
      console.log("Default case");
  }

  return {
    errors,
    reset,
  };
};
