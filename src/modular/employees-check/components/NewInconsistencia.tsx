import { NewInconsistenciaForm } from "."

export interface INewInconsistency {
	setShow: (show: boolean) => void
}

export const NewInconsistencia = ({ setShow }: INewInconsistency) => {
	return (
		<div className="mt-sm">
			<NewInconsistenciaForm setShow={setShow} />
		</div>
	)
}
