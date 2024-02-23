export interface ILoginResponseUser {
  message: string;
  user: ILoginUser;
}

export interface ILoginUser {
  id: number;
  email: string;
  user_name: string;
  role: string;
  is_active: boolean;
}

