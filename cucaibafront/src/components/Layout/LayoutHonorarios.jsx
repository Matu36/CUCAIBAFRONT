import { Outlet } from "react-router-dom";
import BackButton from "../UI/BackButton";

function LayoutHonorarios() {
  return (
    <>
      <main style={{ background: "#f7f7f7" }} className="container p-4">
        <Outlet />
        <br />
        <BackButton />
      </main>
    </>
  );
}

export default LayoutHonorarios;
