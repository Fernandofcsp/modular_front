import { useState } from "react";
import Layout from "../../../ui/layout/Layout";
import { BonusesTable } from "../components/BonusesTable";
import { CreateExcelButton } from "../../../ui/moleculs";
import { SelectorCreateBonuse } from "../../../ui/moleculs/SelectorCreateBonuse";
import createBonuse from "../../../../public/assets/icons/bonus.png";

export function BonusesPage() {
  const [selectedYear, setSelectedYear] = useState(2024);

  return (
    <Layout>
      <div>
        <div className="flex flex-col space-x-md justify-end">
          <div className="flex justify-end w-full">
            <div className="flex flex-col justify-end space-x-xsm space-y-sm">
              <CreateExcelButton
                onClick={() => console.log("Creando excel...")}
              />
            </div>
            <div className="flex flex-col justify-end space-x-xsm space-y-sm px-sm">
              <SelectorCreateBonuse title="Crear Bono" image={createBonuse} />
            </div>
          </div>
        </div>
        <div>
          <select
            id="yearSelect"
            className={
              "flex flex-2 focus:outline-none px-5 me-2 mb-md justify-center items-center space-x-sm text-buttons rounded-lg px-lg py-xsm"
            }
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            value={selectedYear}
          >
            <option selected value={2021}>
              2021
            </option>
            <option selected value={2022}>
              2022
            </option>
            <option selected value={2023}>
              2023
            </option>
            <option selected value={2024}>
              2024
            </option>
          </select>
            <BonusesTable selectedYear={selectedYear} />
        </div>
      </div>
    </Layout>
  );
}
