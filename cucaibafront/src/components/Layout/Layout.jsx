import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import { Home } from "./Home";

function Layout() {
    return <>
        <Header />
        <Home/>
        <SideBar />
        <main><Outlet /></main>
        
        <footer>Footer</footer>
    </>
}

export default Layout;