import { IEmployee } from "../employees/components";

export interface IBonuses {
  bonus: IBonus;
  details: IBonuseDetail[];
}

export interface IBonus {
  id: number;
  year: number;
  month: number;
  porcentage: number;
  total_sales: number;
  total_bonus: number;
}

export interface IBonuseDetail {
  id: number;
  daily_salary: number;
  sum_benefits: number;
  absences: number;
  gain_bonus: number;
  total_bonus: number;
  bonus: number;
  employee: IEmployee;
  created_by?: null;
  updated_by?: null;
}


