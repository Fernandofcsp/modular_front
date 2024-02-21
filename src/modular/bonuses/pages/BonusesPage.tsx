import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Layout from "../../../ui/layout/Layout";
import { BonusesTable } from "../components/BonusesTable";
import { FormField } from "../../employees-check/moleculs";
import { inputType } from "../../users/moleculs";
import { BonusesData } from "../data";

export function BonusesPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const filteredData = selectedYear
    ? BonusesData.filter(
        (item) =>
          moment(item.fechaCreacion, "DD/MM/YYYY").year() === selectedYear
      ) // Filtramos por año utilizando Moment.js
    : BonusesData;

  const uniqueYears = [
    ...new Set(
      BonusesData.map((item) => moment(item.fechaCreacion, "DD/MM/YYYY").year())
    ),
  ];

  return (
    <Layout>
      <div>
        <h2 className="text-titleMd">Bonos</h2>
        <div className="flex flex-row space-x-md justify-end">
          <label
            htmlFor="yearSelect"
            className="block uppercase tracking-wide text-gray-900 text-lg font-bold"
          >
            Seleccione el año:
          </label>
          <select
            id="yearSelect"
            className="border rounded p-2"
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            <option disabled value="" selected></option>
            <option value={0}>Todos</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {selectedYear !== null ? (
          filteredData.length > 0 ? (
            filteredData.length > 12 ? (
              uniqueYears.map((selectedYear) => (
                <div key={selectedYear} className="mt-8">
                  <h3 className="px-md py-sm text-xl font-semibold text-left text-gray-900 bg-white rounded-lg mt-sm">
                    {"Bonos del " + selectedYear}
                  </h3>
                  <BonusesTable
                    bonusesData={filteredData.filter(
                      (item) =>
                        moment(item.fechaCreacion, "DD/MM/YYYY").year() ===
                        selectedYear
                    )}
                  />
                </div>
              ))
            ) : (
              <div key={selectedYear} className="mt-8">
                <h3 className="px-md py-sm text-xl font-semibold text-left text-gray-900 bg-white rounded-lg mt-sm">
                  {"Bonos del " + selectedYear}
                </h3>
                <BonusesTable bonusesData={filteredData} />
              </div>
            )
          ) : (
            <p className="text-red-600">No hay registros</p>
          )
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
}
