import { useState } from "react";
import { TableHeadItem } from "../../users/moleculs";
import { TableBodyRow } from "../moleculs";

interface IAccountBills {
  id: string;
  date: string;
  name: string;
  concept: string;
  reference: string;
  quantity: string;
  typePay: string;
  total: string;
  ver: string;
}

enum TableHeaders {
  date = "Fecha",
  name = "Nombre",
  concept = "Concepto",
  reference = "Referencia",
  quantity = "Cantidad",
  typePay = "Pago/Deposito",
  total = "Total",
  ver = "Ver",
}

const initialState: IAccountBills[] = [
  {
    id: "1",
    date: "02/01/2023",
    name: "AL PORTADOR * Manuel Rivas",
    concept: "REEMBOLSO",
    reference: "BX-7309",
    quantity: "4118",
    typePay: "Pago",
    total: "-4118",
    ver: "Button",
  },
];

export const AccountsTable = () => {
  const [accounts, setAccounts] = useState(initialState);

  // const getUsers = async () => {
  // 	try {
  // 		const { data } = await axios.get(`${apiUrl}/users`, { params: { take: 20, skip: 0 } });
  // 		setUsers(data);
  // 	} catch (error) {
  // 		console.log(error);
  // 	}
  // }

  // useEffect(() => {
  // 	getUsers();
  // }, []);

  return (
    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
      <table className="w-full text-md text-left text-gray-500">
        <caption className="px-md py-sm text-xl font-semibold text-left text-gray-900 bg-white">
          Ingresos y Egresos
        </caption>
        <thead className="text-md text-gray-700 uppercase bg-gray-50">
          <tr>
            {Object.entries(TableHeaders).map((e, i) => {
              return <TableHeadItem key={i} title={e[1]} />;
            })}
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, i) => {
            return (
              <TableBodyRow
                key={i}
                id={account.id}
                date={account.date}
                name={account.name}
                concept={account.concept}
                reference={account.reference}
                quantity={account.quantity}
                typePay={account.typePay}
                total={account.total}
                ver={account.ver}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
