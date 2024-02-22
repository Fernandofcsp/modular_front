import { IField } from "../interfaces/interfaces";

export const FormField = (props: IField) => {
	const { type, placeholder, label, value, onChange: setVal, disabled = false } = props;
	return (
		<div className="flex flex-col items-start w-full pb-md md:mb-0 space-y-sm">
			<label className="block tracking-wide text-gray-900 text-lg ">
				{label}
			</label> 
			<input
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={({ target }) => setVal(target.value)}
				className="appearance-none block w-full bg-gray-50 text-gray-800 border rounded-md py-sm px-md leading-tight focus:outline-none focus:bg-white"
				disabled={disabled}
			/>
		</div>
	);
};
