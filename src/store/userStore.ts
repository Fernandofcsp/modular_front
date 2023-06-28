import { create } from "zustand";
import { persist } from "zustand/middleware";


interface UserState{
    name: string;
    id: number;
    token: string;
    rol: number;
    setName: (name: string) => void,
    setId: (id: number) => void,
    setToken: (token: string) => void,
    setRol: (rol: number) => void,
    logout: () => void,
}

export const userStore = create(persist<UserState>(
    (set) => ({
        //Como se inicializa el estado
        name: "",
        id: null,
        token: "",
        rol: null,
        setName: (name: string) => set((state) => ({
            name
        })),
        setToken: (token: string) => set((state) => ({
            token
        })),
        setId: (id: number) => set((state) => ({
            id
        })),
        setRol: (rol: number) => set((state) => ({
            rol
        })),
        logout: () => set((state) => ({
            name: '',
            token: '',
            id: null,
            rol: null,
        })),
    }), {  //Nombre de como se guarda en localstate
        name: 'auth'
    }
))