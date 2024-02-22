
interface IHeadItem {
    title: string
}

export const TableHeadItem = (props: IHeadItem) => {
  return (
    <th scope="col" className="px-md py-sm w-auto justify-center">
      {props.title}
    </th>
  )
}
