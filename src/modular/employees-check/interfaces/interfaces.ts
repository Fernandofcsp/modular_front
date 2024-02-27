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