import { inputType } from "../../users/moleculs";

interface IField {
	type: inputType;
	placeholder: string;
	label: string;
	value: string | number | undefined;
	disabled?: boolean;
	onChange: (value: any) => void;
}

export const AccountsFormField = (props: IField) => {
	const { type, placeholder, label, value, onChange: setVal, disabled = false } = props;
	return (
		<div className="flex flex-col items-start pb-md md:mb-0 space-y-sm">
			<label className="block tracking-wide text-gray-900 text-lg ">
				{label}
			</label>
			<input
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={({ target }) => setVal(target.value)}
				className="appearance-none block bg-gray-50 text-gray-800 border rounded-md py-sm px-md leading-tight focus:outline-none focus:bg-white"
				disabled={disabled}
			/>
		</div>
	);
};
