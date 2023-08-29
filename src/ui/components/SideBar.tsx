import { SideBarItem } from "../moleculs/SideBarItem";

export const SideBar = () => {
  return (
    <div>
      <div className="w-sideBar h-screen">
        <div className="h-full pt-4xl px-sm py-4 overflow-y-auto bg-gray-800 text-white">
          <ul className="flex flex-col space-y-xsm text-xl">
            <SideBarItem 
              title="Dashboard"
              imageComponent={
                <svg className="w-lg h-lg text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6"/>
                </svg>
              }
            />
            <SideBarItem
              title="Empleados"
              imageComponent={
                <svg className="w-lg h-lg text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.333 6.764a3 3 0 1 1 3.141-5.023M2.5 16H1v-2a4 4 0 0 1 4-4m7.379-8.121a3 3 0 1 1 2.976 5M15 10a4 4 0 0 1 4 4v2h-1.761M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-4 6h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"/>
                </svg>
              }
            />
            <SideBarItem
              title="Cuentas"
              imageComponent={
                <svg className="w-lg h-lg text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 9h2m3 0h5M1 5h18M2 1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"/>
                </svg>
              }
            />
          </ul>
        </div>
      </div>
    </div>
  );
};