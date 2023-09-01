import { FC, ChangeEvent } from 'react';

interface IPropsInput {
	label: string;
	placeHolder: string;
	onChange: (name: string, value: string) => void;
	value: string;
	type: TypesInput;
}

export enum TypesInput {
	text = 'text',
	email = 'email',
	number = 'number',
	password = 'password'
}

const TextInput: FC<IPropsInput> = ({
  label,
  onChange,
  placeHolder,
  type,
  value
}) => {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        placeholder={placeHolder}
        value={value}
        id={label}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
          onChange(target.name, target.value)
        }
      />
      <input type='file' name='' id='' multiple />
    </>
  );
};

export default TextInput;
