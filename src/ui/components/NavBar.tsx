import { useEffect, useState } from "react";
import { userStore } from "../../store/userStore";
import Bsun from "../../../public/assets/icons/sun.png";
import Bmoon from "../../../public/assets/icons/moon.png";
import hand from "../../../public/assets/icons/mano.png";



const NavBar = () => {
  const { name } = userStore((state) => state);
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
              <img src={Bsun} />
          </button>
        ) : (
          <button onClick={togleDarkMod} style={{ width: "20px", height: "20px",}}>
            <img src={Bmoon} />
          </button>
        )}
        <h1 className="text-lg">Username icon Profile</h1>
      </div>
      </div>

  );
};

export default NavBar;