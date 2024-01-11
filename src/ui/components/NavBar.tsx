import { userStore } from "../../store/userStore";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import profile from "../../../public/assets/icons/profile.png";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const NavBar = () => {
  const { name } = userStore((state) => state);
  const logout = userStore((state) => state.logout);
  const navigate = useNavigate();

  return (
    <div className="w-full h-[12vh] p-md flex flex-row items-center bg-white text-[#1B202D] justify-between border-y-2 rounded-lg">
      <div className="gap-x-[45px] text-lg flex flex-row">
        <h2 className="text-xl">¡BIENVENIDO DE VUELTA! {name} </h2>
      </div>
      {/*Contenedor */}
      <Menu as="div" className="relative ml-md">
        <div>
          <Menu.Button className="flex rounded-full bg-white text-sm focus:ring-2 focus:ring-gray  ">
            <span className="sr-only">Open user menu</span>
            <img
              className="w-2xl rounded-full ring-1 ring-gray-800"
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
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    active ? "dark:bg-[#0E1117]" : "",
                    "block px-lg py-sm text-md hover:bg-blue-600 hover:text-white text-white-700 rounded-md"
                  )}
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Cuenta
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href=""
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    active ? "dark:bg-[#0E1117]" : "",
                    "block px-lg py-sm text-md hover:bg-blue-600 hover:text-white text-white-700 rounded-md"
                  )}
                  onClick={() => {
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
  );
};

export default NavBar;
