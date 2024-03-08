import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Layout from "../../../ui/layout/Layout";
import { BonuseTable } from "../components/BonuseTable";
import { CreateExcelButton, NavigateButton } from "../../../ui/moleculs";
import back from "../../../../public/assets/icons/back.png"

export const BonusePage = () => {
  const {month, year} = useParams();

  const navigate = useNavigate();
  const [selectedYear] = useState(Number(year));
  const [selectedMonth] = useState(Number(month));


  return (
    <Layout>
      <div>
				<div className="flex flex-2 justify-end w-full space-x-xsm">
					<div className="flex flex-col justify-end space-y-xsm">
						<CreateExcelButton onClick={() => console.log("Creando excel...")} />
					</div>
          <div className="flex flex-row justify-end space-x-xsm">
          <NavigateButton onClick={() => navigate("/bonuses")} title='Volver' image={back}  />

					</div>

				</div>
        {/* <h2 className="text-headerTitle">Detalle de bono</h2> */}
        <div className="flex justify-end mb-md">
        </div>
        <BonuseTable selectedMonth={selectedMonth} selectedYear={selectedYear}/>
      </div>
    </Layout>
  );
};
