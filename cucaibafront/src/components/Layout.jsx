import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

function Layout() {
    return <>
        <SideBar />
        <main><Outlet /></main>
        
        <footer>Footer</footer>
    </>
}

export default Layout;