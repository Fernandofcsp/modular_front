import moment from "moment";

interface IValidateFields {
  errors: string[];
  reset: boolean;
}

export const validateFields = (
  inconsistencyType: number,
  initialDate: string,
  endDate?: string,
  exitType?: number
): IValidateFields => {
  const errors = [];
  let reset = false;

  switch (inconsistencyType) {
    case 0:
      //Revisar
      if (initialDate === "") errors.push("Debes seleccionar una fecha");

      if (moment(initialDate).isAfter(moment())) {
        errors.push("La fecha no debe de ser del futuro");
        reset = true;
      }
      break;
    case 1:
      if (initialDate === "" || endDate === "")
        errors.push("Debes seleccionar fechas válidas");
      if (moment(initialDate).isSameOrAfter(moment(endDate))) {
        errors.push("La fecha inicial debe ser menor a la final");
        reset = true;
        break;
      }
      if (
        moment(initialDate).isAfter(moment()) ||
        moment(endDate).isAfter(moment())
      ) {
        errors.push("Las fechas no pueden ser del futuro");
        reset = true;
        break;
      }
      break;
    case 2:
      if (initialDate === "" || endDate === "")
        errors.push("Debes seleccionar fechas válidas");
      if (moment(initialDate).isAfter(moment(endDate))) {
        errors.push("La fecha inicial debe ser menor a la final");
        reset = true;
        break;
      }
      break;
    case 3:
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

  if (exitType === -1) errors.push("Debes elegir un tipo de entrada");
  return {
    errors,
    reset,
  };
};
