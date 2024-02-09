import { inputType } from "../../users/moleculs";

export interface IField {
  type: inputType;
  placeholder: string;
  label: string;
  value: string | number | undefined;
  disabled?: boolean;
  onChange: (value : any) => void;
}
