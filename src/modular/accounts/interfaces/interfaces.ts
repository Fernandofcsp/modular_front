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