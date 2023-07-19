import NavBar from "../components/NavBar"
import { SideBar } from "../components/SideBar"

interface IProps {
  children: JSX.Element
}

const Layout = ({children} : IProps) => {
  return(
    <div className="w-full dark:bg-[#212E36] dark:text-white bg-[#FBFBFE] text-[#1B202D]">
        <NavBar />
        <SideBar />
        { children }
    </div>
  )
}

export default Layout