export enum inputType {
  text = "text",
  email = "email",
  number = "number",
  file = "file",
  password = "password",
	date = "date",
	dateTime = "datetime-local"
}

interface IField<T> {
  type: inputType;
  placeholder: string;
  label: string;
  value: T;
  disabled?: boolean;
	onChange: (value: T) => void;
}

export const FormField = <T extends string | number>(props: IField<T>) => {
  const { type, placeholder, label, value, onChange: setVal, disabled=false } = props;
  return (
    <div className="flex flex-col items-start px-sm w-full mb-sm md:mb-0">
      <label className="block tracking-wide text-gray-900 text-lg mb-sm">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={({ target }) => setVal(target.value as T)}
        className="appearance-none text-lg block w-full bg-gray-50 text-gray-800 border rounded-md py-sm px-md mb-xsm leading-tight focus:outline-none focus:bg-white"
		disabled={disabled}
      />
    </div>
  );
};
