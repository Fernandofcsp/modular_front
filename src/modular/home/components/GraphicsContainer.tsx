import { BonusChart, BonusPredictChart } from "../moleculs";
import { LastMovementsTable } from "./LastMovementsTable";


export const GraphicsContainer = () => {
	return (
		<div className="flex flex-col w-full space-y-md justify-start">
			<div className="flex flex-row w-full space-x-xl">
				<BonusChart />
				<BonusPredictChart />
			</div>
			<LastMovementsTable />
		</div>
	)
}
