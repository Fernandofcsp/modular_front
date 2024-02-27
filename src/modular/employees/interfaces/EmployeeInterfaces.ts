import { IBenefits } from "../components";

export interface IEmployee {
  employee_id: number;
  first_name: string;
  last_name1: string;
  last_name2: string;
  daily_salary: number;
  admision_date: string;
  status: number;
  created_date: string;
  updated_date: string;
  created_user_id: number;
  benefits: IBenefits[];
}