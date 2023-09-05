import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useQuery } from "@tanstack/react-query";
import { getHonorariosPendienteshome } from "../../hooks/useHonorarios";

function Layout() {
  const { data, isFetched } = useQuery({
    queryKey: ["honorariosPendientesHome"],
    queryFn: () => getHonorariosPendienteshome(),
  });

  return (
    <>
      <Header data={data} isFetched={isFetched} />
      <main
        style={{
          background: "#f7f7f7",
        }}
      >
        <Outlet context={{ data, isFetched }} />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
