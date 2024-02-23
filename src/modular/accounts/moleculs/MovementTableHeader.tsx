

export const MovementTableHeader = ({ title }: { title: string }) => {
	return (
		<th className="items-start px-sm py-sm bg-gray-100 text-center text-md text-gray-700 capitalize tracking-wider min-w-min">
			<p>{title}</p>
		</th>
	)
}
