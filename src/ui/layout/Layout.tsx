import NavBar from "../components/NavBar"

interface IProps {
  children: JSX.Element
}

const Layout = ({children} : IProps) => {
  return(
    <div>
        <NavBar />
        { children }
    </div>
  )
}

export default Layout