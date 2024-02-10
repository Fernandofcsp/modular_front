import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../ui/layout/Layout";
import axios from "axios";
import { apiUrl } from "../../../api";
import { useEffect, useState } from "react";
import { userStore } from "../../../store/userStore";
import cancel from "../../../../public/assets/icons/cancel.png";
import save from "../../../../public/assets/icons/salvar.png";
import edit from "../../../../public/assets/icons/editar.png";
import { FormField } from "../../employees-check/moleculs";
import { inputType } from "../../users/moleculs";
import { validateAccountFields } from "../helpers/ValidateFields";
import { BackButton } from "../../../ui/moleculs/BackButton";

interface IAccount {
  concept: string;
  reference: string;
  quantity: number;
  date: string;
}

const initialState: IAccount = {
  concept: "",
  reference: "",
  quantity: 0,
  date: "",
};

export const AccountPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const id = state.id;
  const [account, setAccount] = useState<IAccount>(initialState);
  const token = userStore((state) => state.token);

  const [concept, setConcept] = useState("");
  const [reference, setReference] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [accountDate, setAccountDate] = useState("");
  const [isDisabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  const handleReset = () => {
    setConcept(account.concept);
    setReference(account.reference);
    setQuantity(account.quantity);
    setAccountDate(account.date);
    setDisabled(true);
  };

  const getAccount = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/account/${id}`);
      setAccount(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateAccount = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const result = validateAccountFields(
      concept,
      reference,
      quantity,
      accountDate
    );

    if (result.length > 0) {
      setErrors(result);
      setTimeout(() => setErrors([]), 4000);
    } else {
      const data = JSON.stringify({
        concept: concept,
        reference: reference,
        quantity: quantity,
        date: accountDate,
      });

      const config = {
        method: "patch",
        url: `${apiUrl}/account/update`,
        headers: {
          "Accept-Encoding": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      console.log(config);
      /*
			try {
				const { data } = await axios.request(config);
				console.log(data);
				navigate("/account");
			} catch (error) {
				console.log(error);
			}*/
    }
  };

  return (
    <Layout>
      <form className="w-9/12 mt-sm">
        <h3 className="text-titleSm mb-xl uppercase">Modificar cuenta</h3>
        <div className="flex flex-row space-x-sm">
          <FormField
            label="Concepto"
            value={concept}
            placeholder={"Concepto de la cuenta"}
            onChange={setConcept}
            type={inputType.text}
            disabled={isDisabled}
          />
          <FormField
            label="Referencia"
            value={reference}
            placeholder={"Referencia bancaria"}
            onChange={setReference}
            type={inputType.text}
            disabled={isDisabled}
          />
        </div>
        <div className="flex flex-row space-x-sm">
          <FormField
            label="Cantidad"
            value={quantity}
            placeholder="Cantidad de la cuenta"
            onChange={setQuantity}
            type={inputType.number}
            disabled={isDisabled}
          />
          <FormField
            label="Fecha"
            value={accountDate}
            placeholder="Fecha de cuenta"
            onChange={setAccountDate}
            type={inputType.date}
            disabled={isDisabled}
          />
        </div>
        {errors.length > 0 &&
          errors.map((error) => (
            <div className="mb-sm">
              <p key={error} className="text-red-600 text-end">
                {error}
              </p>
            </div>
          ))}
        <div className="flex justify-end space-x-sm">
          {!isDisabled ? (
            <>
              <button
                type="button"
                onClick={() => handleReset()}
                className="bg-red-800 hover:bg-red-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm"
              >
                <span>Cancelar</span>
                <img src={cancel} className="w-md "></img>
              </button>
              <button
                type="button"
                onClick={(event) => updateAccount(event)}
                className="bg-green-800 hover:bg-green-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm"
              >
                <span>Guardar</span>
                <img src={save} className="w-md "></img>
              </button>
            </>
          ) : (
            <>
              <BackButton onClick={() => navigate("/accounts")} />
              <button
                type="button"
                onClick={() => setDisabled(false)}
                className="bg-gray-800 hover:bg-gray-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md flex items-center gap-sm"
              >
                <span>Editar</span>
                <img src={edit} className="w-md "></img>
              </button>
            </>
          )}
        </div>
      </form>
    </Layout>
  );
};
