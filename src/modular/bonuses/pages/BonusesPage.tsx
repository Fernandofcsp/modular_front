import Layout from "../../../ui/layout/Layout";
import { BonusesTable } from "../components/BonusesTable";
import { SelectorCreateBonuse } from "../../../ui/moleculs/SelectorCreateBonuse";
import createBonuse from "../../../../public/assets/icons/bonus.png";

export function BonusesPage() {
	return (
		<Layout>
			<div>
				<div className="flex flex-col space-x-md justify-end">
					<div className="flex justify-end w-full">
						<div className="flex flex-col justify-end space-x-xsm space-y-sm">
							<SelectorCreateBonuse title="Crear Bono" image={createBonuse} />
						</div>
					</div>
				</div>
				<div>
					<BonusesTable />
				</div>
			</div>
		</Layout>
	);
}
