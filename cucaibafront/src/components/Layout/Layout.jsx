import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <Header />
      <main
        style={{
          background: "#f7f7f7",
          padding: "80px 10px",
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
