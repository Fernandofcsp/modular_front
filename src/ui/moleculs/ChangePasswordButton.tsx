import edit from "../../../public/assets/icons/editar.png";
import { IChangePasswordButton } from "../interfaces/UIInterfaces";

export const ChangePasswordButton = (props: IChangePasswordButton) => {
  const { title, onClick } = props;
  return (
    <button
      type="button"
      onClick={() => {
        onClick(true);
      }}
      className={
        title == "Cancelar cambio"
          ? "bg-gray-700 hover:bg-gray-600 hover:font-bold text-white font-semibold py-xsm px-[71px] rounded-md flex items-center gap-xsm"
          : "bg-gray-700 hover:bg-gray-600 hover:font-bold text-white font-semibold py-xsm px-[53px] rounded-md flex items-center gap-xsm"
      }
    >
      <span>{title}</span>
      <img src={edit} className="w-md py-xsm"></img>
    </button>
  );
};
