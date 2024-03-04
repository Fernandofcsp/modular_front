import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../api";
import { useEffect, useState } from "react";
import { userStore } from "../../../store/userStore";
import Layout from "../../../ui/layout/Layout";
import { BonuseTable } from "../components/BonuseTable";
import { BonuseData } from "../dataBonuse";
import { CreateExcelButton, NavigateButton } from "../../../ui/moleculs";
import back from "../../../../public/assets/icons/back.png"
interface IBonuse {
  bonuseDetail_id: string;
  bonuse_id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  daily_salary: number;
  sum_benefits: number;
  sum_minutes_delay: number;
  absences: number;
  base_calculo: number;
  bono: number;
  bono_completo: number;
  diferencia: number;
  date: string;
  created_date: string;
  updated_date: string;
  created_user_id: string;
  updated_user_id: string;
}

const initialState: IBonuse = {
  bonuseDetail_id: "",
  bonuse_id: "",
  employee_id: "",
  first_name: "",
  last_name: "",
  daily_salary: 0,
  sum_benefits: 0,
  sum_minutes_delay: 0,
  absences: 0,
  base_calculo: 0,
  bono: 0,
  bono_completo: 0,
  diferencia: 0,
  date: "",
  created_date: "",
  updated_date: "",
  created_user_id: "",
  updated_user_id: "",
};

export const BonusePage = () => {
  const { state } = useLocation();
  const id = state.bonuse_id;
  const navigate = useNavigate();

  const [bonuse, setBonuse] = useState<IBonuse>(initialState);
  const token = userStore((state) => state.token);


  

  const getBonuse = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/bonuse/${id}`);
      setBonuse(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBonuse();
  }, []);

  return (
    <Layout>
      <div className=" ">
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
        <BonuseTable bonuseData={BonuseData} />
      </div>
    </Layout>
  );
};
