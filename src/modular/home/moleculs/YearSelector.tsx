
interface IYearSelector {
	year: number,
	setYear: (year: number) => void
}

export const YearSelector = (props: IYearSelector) => {
	const { year, setYear } = props;
	return (
		<div className="flex items-end justify-end">
			<select
				className="py-sm px-md rounded-md"
				value={year}
				onChange={({ target }) => { setYear(parseInt(target.value)) }}
			>
				<option defaultChecked value={-1}>
					Seleccione
				</option>
				<option value={2021}>2021</option>
				<option value={2022}>2022</option>
				<option value={2023}>2023</option>
				<option value={2024}>2024</option>
			</select>
		</div>
	)
}
