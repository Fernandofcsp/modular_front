import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ISelectedUser {
	id: number
}

interface IUserState extends ISelectedUser {
  setId: (value: number) => void;
  reset: () => void;
}

const initialState: ISelectedUser = {
  id: 3,
};

export const selectedUserStore = create(
  persist<IUserState>(
    (set) => ({
      //Como se inicializa el estado
      ...initialState,
      setId: (value: number) => set(() => ({ id: value })),
      reset: () => set(() => ({ ...initialState })),
    }),
    {
      //Nombre de como se guarda en localState
      name: "selectedEmployee",
    }
  )
);
