import NavBar from "../components/NavBar"

interface IProps {
  children: JSX.Element
}

const Layout = ({children} : IProps) => {
  return(
    <main className="w-full h-screen flex flex-col items-left dark:bg-[#212E36] dark:text-white bg-[#FBFBFE] text-[#1B202D]">
        <NavBar />
        { children }
    </main>
  )
}

export default Layout