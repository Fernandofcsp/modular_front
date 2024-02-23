
interface IHeadItem {
    title: string
}

export const TableHeadItem = (props: IHeadItem) => {
  return (
    <th scope="col" className="px-sm py-sm w-auto">
      {props.title}
    </th>
  )
}
