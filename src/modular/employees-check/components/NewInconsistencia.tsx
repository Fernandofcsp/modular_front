import { NewInconsistenciaForm } from "."

export interface INewInconsistency {
	idEmployee: number,
	setShow: (show: boolean) => void
}

export const NewInconsistencia = ({ idEmployee, setShow }: INewInconsistency) => {
	return (
		<div className="mt-sm">
			<NewInconsistenciaForm idEmployee={idEmployee} setShow={setShow} />
		</div>
	)
}
