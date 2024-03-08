import moment from 'moment';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IFilter {
	month: number;
	year: number;
}

interface IMovementsFilter extends IFilter {
  // setUser: (user: User) => void,
  setValue: (name: string, value: number) => void;
  clear: () => void;
}

const initialState: IFilter = {
  month: +moment().format("M"),
  year: +moment().format("YYYY"),
};

export const movementsFilterStore = create(
  persist<IMovementsFilter>(
    (set) => ({
      //Como se inicializa el estado
      ...initialState,
      setValue: (name: string, value: number) => set(() => ({ [name]: value })),
      clear: () => set(() => ({ ...initialState })),
    }),
    {
      //Nombre de como se guarda en localState
      name: "movementFilter",
    }
  )
);
