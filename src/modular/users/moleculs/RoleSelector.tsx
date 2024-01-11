interface IRoleSelector {
	value : string,
	setValue : ( value : string ) => void,
	disabled : boolean
}

const roles = [
	"INOPERATIVE",
	"READ",
	"WRITE",
	"OVERWRITE"
];

export const RoleSelector = ({ value, setValue, disabled } : IRoleSelector) => {
	return (
		<div className="flex flex-col">
			<label className="block uppercase tracking-wide text-gray-900 text-lg font-bold mb-sm">
				Rol del usuario
			</label>
			<select disabled={ disabled } className="py-sm px-md rounded-md" value={value} onChange={({ target }) => setValue(target.value)}>
				{
					roles.map(rol => {
						return <option key={ rol } value={ rol }>{ rol }</option>
					})
				}

			</select>
		</div>
	)
}
