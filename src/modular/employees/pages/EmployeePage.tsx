import { useLocation } from "react-router-dom";
import Layout from "../../../ui/layout/Layout";
import { useState } from "react";
import { userStore } from "../../../store/userStore";
import { FormField, inputType } from "../../users/moleculs";
import { EmployeeInformation } from "../components/EmployeeInformation";
import axios from "axios";
import { apiUrl } from "../../../api";
import { ToastContainer, toast } from "react-toastify";
import back from "../../../../public/assets/icons/back.png";
import cancel from "../../../../public/assets/icons/cancel.png";
import save from "../../../../public/assets/icons/salvar.png";
import edit from "../../../../public/assets/icons/editar.png";
import { useNavigate } from "react-router-dom";
/*
interface IErrorResponse {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: string;
}*/
export const notify = (type: any) => {
  switch (type) {
    case "WARN":
      toast.error("Datos incompletos o incorrectos", {
        position: toast.POSITION.TOP_RIGHT,
        className: "mt-3xl",
      });
      break;
    case "ERROR":
      toast.error(
        "Error en el sistema, intentelo mas tarde, si el problema persiste, consulte a soporte.",
        { position: toast.POSITION.TOP_RIGHT, className: "mt-3xl" }
      );
      break;
    case "SUCCESS":
      toast.success("Edición de empleado exitoso", {
        position: toast.POSITION.TOP_RIGHT,
        className: "mt-3xl",
      });
      break;
  }
};
export const EmployeePage = () => {
  const { state } = useLocation();

  const {
    employee_id,
    first_name,
    last_name1,
    last_name2,
    daily_salary,
    admision_date,
    status,
    created_date,
    updated_date,
    created_user_id,
  } = state;

  const navigate = useNavigate();
  const [name, setName] = useState(first_name);
  const [lastName1, setLastName1] = useState(last_name1);
  const [lastName2, setLastName2] = useState(last_name2);
  const [dailySalary, setDailySalary] = useState(daily_salary);
  const [admisionDate, setAdmisionDate] = useState(admision_date);
  const [job, setJob] = useState("");
  const [newStatus, setNewStatus] = useState(status);
  const token = userStore((state) => state.token);
  const [isDisabled, setDisabled] = useState(true);

  const handleReset = () => {
    setDisabled(!isDisabled);
    setName(first_name);
    setLastName1(last_name1);
    setLastName2(lastName2);
    setDailySalary(daily_salary);
    setJob("");
    setDisabled(true);
  };

  const saveEmployeeData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const date = new Date(admisionDate);
    const data = JSON.stringify({
      first_name: name,
      last_name1: lastName1,
      last_name2: lastName2,
      daily_salary: parseInt(dailySalary),
      //admision_date: date,
      status: newStatus,
    });

    const config = {
      method: "patch",
      url: `${apiUrl}/employees/update/${employee_id}`,
      headers: {
        "Accept-Encoding": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    try {
      const { data, status } = await axios.request(config);
      console.log(data);
      if (status == 200) {
        notify("SUCCESS");
        handleReset();
      }
    } catch (error: any) {
      if (error.message == "Request failed with status code 400") {
        notify("WARN");
      } else {
        notify("ERROR");
      }
    }
  };
  /*try {
      const { data } = await axios.request(config);
      console.log(data);

      alert("Éxito");
    } catch (error) {
      const errors = (error as Error).response.data.errors;
      errors.forEach((error: IErrorResponse) => {
        alert(`${error.msg}  ${error.path}`);
      });
    }
  };*/
  return (
    <Layout>
      <div>
        <form
          onSubmit={(event) => saveEmployeeData(event)}
          className="w-9/12 mt-sm"
        >
          <h3 className="text-titleMd mb-xl uppercase">
            información del empleado con id: {employee_id}
          </h3>
          <EmployeeInformation
            created_date={created_date}
            created_user_id={created_user_id}
            updated_date={updated_date}
          />
          <div className="flex flex-row -mx-sm mb-md">
            <FormField
              label="Nombre"
              value={name}
              placeholder={first_name}
              onChange={setName}
              type={inputType.text}
              disabled={isDisabled}
            />
            <FormField
              label="Primer apellido"
              value={lastName1}
              placeholder={last_name1}
              onChange={setLastName1}
              type={inputType.text}
              disabled={isDisabled}
            />
            <FormField
              label="Segundo apellido"
              value={lastName2}
              placeholder={last_name2}
              onChange={setLastName2}
              type={inputType.text}
              disabled={isDisabled}
            />
          </div>
          <div className="flex flex-row -mx-sm mb-md">
            <FormField
              label="Salario diario"
              value={dailySalary}
              placeholder="Salario diario"
              onChange={setDailySalary}
              disabled={isDisabled}
              type={inputType.number}
            />
            <div className="flex flex-col items-start px-sm w-full mb-sm md:mb-0">
              <label className="block uppercase tracking-wide text-gray-900 text-lg font-bold mb-sm">
                PUESTO
              </label>
              <select
                disabled={isDisabled}
                value={job}
                onChange={({ target }) => setJob(target.value)}
                className="block w-full bg-gray-50 text-gray-800 border rounded-md py-sm px-md mb-xsm leading-tight focus:outline-none focus:bg-white"
              >
                <option disabled value={0}>
                  Seleccione una opción
                </option>
                <option value={1}>JEFE</option>
                <option value={2}>AUXILIAR</option>
                <option value={3}>INTENDENTE</option>
                <option value={4}>PRODUCCIÓN</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row -mx-sm mb-md">
            <FormField
              label="Fecha de ingreso"
              value={admision_date.toString().split("T")[0]}
              placeholder="Fecha de ingreso"
              onChange={setAdmisionDate}
              disabled={isDisabled}
              type={inputType.date}
            />
            <div className="flex flex-col items-start px-sm w-full mb-sm md:mb-0">
              <label className="block uppercase tracking-wide text-gray-900 text-lg font-bold mb-sm">
                ESTADO
              </label>
              <select
                disabled={isDisabled}
                value={newStatus}
                onChange={({ target }) => setNewStatus(target.value)}
                className="block w-full bg-gray-50 text-gray-800 border rounded-md py-sm px-md mb-xsm leading-tight focus:outline-none focus:bg-white"
              >
                <option value={1}>ACTIVO</option>
                <option value={0}>INACTIVO</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-sm">
            <button
              type={isDisabled ? "submit" : "button"}
              onClick={() => {
                navigate("/Employees");
              }}
              className={`bg-blue-800 hover:bg-blue-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md 
            flex items-center gap-sm ${!isDisabled && "hidden"}`}
            >
              <span>Volver</span>
              <img src={back} className="w-md "></img>
            </button>
            <button
              type="button"
              onClick={() => handleReset()}
              className={`bg-red-800 hover:bg-red-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md 
							flex items-center gap-sm ${isDisabled && "hidden"}`}
            >
              <span>Cancelar</span>
              <img src={cancel} className="w-md "></img>
            </button>
            <button
              type={isDisabled ? "submit" : "button"}
              onClick={() => setDisabled((value) => !value)}
              className={` hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm ${
                !isDisabled
                  ? `bg-green-800 hover:bg-green-600`
                  : `bg-gray-800 hover:bg-gray-600 `
              }`}
            >
              <span>{!isDisabled ? "Guardar" : "Editar"}</span>
              <img src={!isDisabled ? save : edit} className="w-md "></img>
            </button>
          </div>
          <ToastContainer />
        </form>
      </div>
    </Layout>
  );
};
