import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Layout from "../../../ui/layout/Layout";
import { AccountsTable } from "../components";
import { FormField } from "../../employees-check/moleculs";
import { inputType } from "../../users/moleculs";
import { accountsData } from "../data";

export function AccountsPage() {
  const navigate = useNavigate();

  const [initialDateToFilter, setInitialDateToFilter] = useState("2022-01-01");
  const [endDateToFilter, setEndDateToFilter] = useState("2024-01-01");
  const [data, setData] = useState(accountsData);

  useEffect(() => {
    console.log(initialDateToFilter, endDateToFilter);
    if (initialDateToFilter === "" || endDateToFilter === "") return;

    //Filtrar registros por fecha
    setData(
      accountsData.filter((data) =>
        moment(data.fecha).isBetween(
          moment(initialDateToFilter),
          moment(endDateToFilter)
        )
      )
    );
  }, [initialDateToFilter, endDateToFilter]);

  return (
    <Layout>
      <div>
        <h2 className="text-titleMd">Cuentas</h2>
        <div className="flex justify-end mb-md">
          <button
            className="text-white text-lg uppercase bg-blue-800 hover:font-semibold px-md py-sm rounded-md hover:bg-blue-600"
            onClick={() => navigate("/new-account")}
          >
            Nueva cuenta
          </button>
        </div>
        <div className="flex flex-row space-x-md">
          <FormField
            label="Fecha inicial"
            onChange={setInitialDateToFilter}
            type={inputType.date}
            value={initialDateToFilter}
            placeholder=""
          />
          <FormField
            label="Fecha final"
            onChange={setEndDateToFilter}
            type={inputType.date}
            value={endDateToFilter}
            placeholder=""
          />
        </div>
        {initialDateToFilter !== "" && endDateToFilter !== "" ? (
          data.length > 0 ? (
            <div className="space-y-md mt-sm">
              <p>Total de cuentas: {data.length}</p>
              <AccountsTable accountsData={data} />
            </div>
          ) : (
            <p className="text-red-600">
              No hay registros entre las fechas seleccionadas
            </p>
          )
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
}
