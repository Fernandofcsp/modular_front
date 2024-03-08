import { inputType } from "../../users/moleculs";


export interface IField {
  type: inputType;
  placeholder: string;
  label: string;
  value: string | number | undefined;
  disabled?: boolean;
  onChange: (value : any) => void;
}

export interface IInconsistency {
  id: number;
  initial_date: string;
  final_date: string;
  type: string;
  minutes: number;
  description?: string;
  is_active?: true;
  created_at?: number;
  updated_at?: number;
}

export interface IBonuses {
  bonus: IBonus;
  details: IBonuseDetail[];
}

export interface IBonus {
  id: number;
  year: number;
  month: number;
  porcentage: string;
  total_sales: string;
  total_bonus: string;
}


export interface IBonuseDetail {
  id: number;
  daily_salary: string;
  sum_benefits: string;
  absences: number;
  gain_bonus: string;
  total_bonus: string;
  bonus: number;
  employee: number;
  created_by: null;
  updated_by: null;
}
