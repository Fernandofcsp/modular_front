import React from "react";
interface IFormButtons {
  save: (e: React.SyntheticEvent) => void;
  cancel: (e: React.SyntheticEvent) => void;
}

export const FormButtons = ({ save, cancel }: IFormButtons) => {
  return (
    <div className="flex justify-end space-x-sm">
      <button
        onClick={(event) => cancel(event)}
        className={`bg-red-800 hover:bg-red-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md 
            flex items-center gap-sm `}
      >
        Cancelar
		<img src="../../../../public/assets/icons/cancel.png" className="w-md "></img>
      </button>
      <button
        onClick={(event) => save(event)}
        className={`bg-green-800 hover:bg-green-600 hover:font-bold text-white font-semibold py-xsm px-lg rounded-md 
            flex items-center gap-sm`}
      >
        Guardar
		<img src="../../../../public/assets/icons/salvar.png" className="w-md"></img>
      </button>
    </div>
  );
};
