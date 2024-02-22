import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Layout from "../../../ui/layout/Layout";
import { BonusesTable } from "../components/BonusesTable";

import { BonusesData } from "../data";

export function BonusesPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(0);
  
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
            className="block uppercase tracking-wide text-gray-900 text-lg font-normal py-xsm px-xsm justify-center"
          >
            Seleccione el año:
          </label>
          <select
            id="yearSelect"
            className="border rounded-lg p-2 justify-center py-sm px-md"
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            value={uniqueYears[-1]} // Aquí seleccionamos el primer valor
        
          >
            
            <option value={0} >Todos</option>
            {uniqueYears.map((year) => (
              <option  key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {selectedYear !== null ? (
          filteredData.length > 0 ? (
            filteredData.length > 12 ? (
              uniqueYears.map((selectedYear) => (
                
                  <BonusesTable
				  selectedYear={selectedYear}
                    bonusesData={filteredData.filter(
                      (item) =>
                        moment(item.fechaCreacion, "DD/MM/YYYY").year() ===
                        selectedYear
                    )}
                  />
                
              ))
            ) : (
             
                
                <BonusesTable 
				selectedYear={selectedYear}
				bonusesData={filteredData} />
              
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
