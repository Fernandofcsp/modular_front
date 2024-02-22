import { CancelButton, SaveButton } from "../../../ui/moleculs";
interface IFormButtons {
  save: () => void;
  cancel: () => void;
}

export const FormButtons = ({ save, cancel }: IFormButtons) => {
  return (
    <div className="flex justify-end space-x-sm">
			<CancelButton title="Cancelar" onClick={() => cancel()} />
			<SaveButton title="Guardar" onClick={() => save()} />
    </div>
  );
};
