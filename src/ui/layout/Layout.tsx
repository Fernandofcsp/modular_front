import NavBar from "../components/NavBar"
import { SideBar } from "../components/SideBar"

interface IProps {
	children: JSX.Element
}

const Layout = ({ children }: IProps) => {
	return (
		<div className="overflow-y-hidden w-full bg-[#FBFBFE] text-[#1B202D] flex flex-row">
			<SideBar />
			<div className="w-full flex flex-col h-screen">
				<NavBar />
				<main className="p-lg h-full overflow-y-auto bg-dashboard">
					{children}
				</main>
			</div>

		</div>
	)
}

export default Layout