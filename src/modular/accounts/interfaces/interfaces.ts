export interface IAccount {
  id: number;
  name: string;
  created_at: string;
  created_by: number | null;
  updated_at?: string;
  updated_by?: number | null;
}

export interface IAccounts {
	accounts: IAccount[]
}

export interface IMovement {
    id: number,
    concept: string,
    reference: string,
    amount: number,
    date: string,
    created_at: string,
		account: IAccount
    updated_at?: string,
    created_by?: string,
    updated_by?: string,
}

export interface IMovements {
	idAccount: number,
	movements: IMovement[]
}