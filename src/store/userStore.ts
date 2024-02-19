import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUser {
	name: string | null;
	email: string | null;
	id: string | null;
	token: string | null;
	rol: string | null;
}

interface IUserState extends IUser {
	// setUser: (user: User) => void,
	setValue: (name: string, value: string) => void;
	logout: () => void;
}

const initialState: IUser = {
  id: null,
  email: null,
  name: null,
  rol: null,
  token: null
};

export const userStore = create(
  persist<IUserState>(
    (set) => ({
      //Como se inicializa el estado
      ...initialState,
      setValue: (name: string, value: string) => set(() => ({ [name]: value })),
      logout: () => set(() => ({ ...initialState }))
    }),
    {
      //Nombre de como se guarda en localState
      name: 'auth'
    }
  )
);
