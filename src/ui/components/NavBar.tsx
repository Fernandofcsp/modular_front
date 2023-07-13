import { useEffect, useState } from "react";
import { userStore } from "../../store/userStore";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useNavigate } from "react-router-dom";
import profile from "../../../public/assets/images/thispersondoesnotexist.jpg";
import hand from "../../../public/assets/icons/mano.png";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

const NavBar = () => {
  const { name } = userStore((state) => state);
  const logout = userStore((state) => state.logout);
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    theme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [theme]);
  const togleDarkMod = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };  
  return (
      <div className="w-full h-[10vh] p-6 flex flex-row items-center dark:bg-[#0E1117] dark:text-white bg-[#ffffff] text-[#1B202D]  justify-between">
      <div className="gap-x-[45px] text-lg flex flex-row">
        <h1>Bienvenido de vuelta, {name} </h1>
        <img src={hand} style={{ width: "20px", height: "20px",}}/>
      </div>
      <div className="flex flex-row items-center gap-x-5">
        {theme === "dark" ? (
          <button onClick={togleDarkMod} style={{ width: "20px", height: "20px",}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
          </button>
        ) : (
          <button onClick={togleDarkMod} style={{ width: "20px", height: "20px",}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
          </button>
        )}
        {/*Contenedor */}
        <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={profile}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md dark:bg-[#212E36] dark:text-white bg-[#FBFBFE] text-[#1B202D] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href=""
                            className={classNames(active ? 'bg-gray-100' : '', active ? 'dark:bg-[#0E1117]' : '', 'block px-4 py-2 text-sm text-white-700')} onClick={() => {
                              navigate("/profile");}}
                          >
                            Perfil
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href=""
                            className={classNames(active ? 'bg-gray-100' : '', active ? 'dark:bg-[#0E1117]' : '', 'block px-4 py-2 text-sm text-white-700')}
                          >
                            Ajustes
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href=""
                            className={classNames(active ? 'bg-gray-100' : '', active ? 'dark:bg-[#0E1117]' : '', 'block px-4 py-2 text-sm text-white-700')} onClick={() => {
                              logout();
                              navigate("/login");
                            }}
                          >
                            Salir
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
      </div>
    </div>
  );
};

export default NavBar;