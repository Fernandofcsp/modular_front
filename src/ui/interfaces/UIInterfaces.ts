import { ReactNode } from "react";

export interface IEditButton{
	title: ReactNode,
	onClick: (value: boolean) => void
}

export interface ISaveButton{
	title: string,
	onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export interface ICancelButton{
	title: string,
	onClick: () => void
}

export interface IChangePasswordButton{
	title: string,
	onClick: (value: boolean) => void
}