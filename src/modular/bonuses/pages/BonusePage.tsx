import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Layout from "../../../ui/layout/Layout";
import { BonuseTable } from "../components/BonuseTable";
import { NavigateButton } from "../../../ui/moleculs";
import back from "../../../../public/assets/icons/back.png";

export const BonusePage = () => {
	const { month, year } = useParams();

	const navigate = useNavigate();
	const [selectedYear] = useState(Number(year));
	const [selectedMonth] = useState(Number(month));


	return (
		<Layout>
			<div>
				<div className="flex justify-end">
					<NavigateButton onClick={() => navigate("/bonuses")} title='Volver' image={back} />
				</div>
				{/* <h2 className="text-headerTitle">Detalle de bono</h2> */}
				<div className="flex justify-end mb-md">
				</div>
				<BonuseTable selectedMonth={selectedMonth} selectedYear={selectedYear} />
			</div>
		</Layout>
	);
};
