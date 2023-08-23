import {
  Navigate,
  Outlet,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";

import { Home } from "../Pages/Home";
import Layout from "../components/Layout/Layout";
import Operativos from "../Pages/Operativos";
import CrearAgente from "../Pages/Crear-Agente";
import { CrearOperativo } from "../Pages/Crear-Operativo";
import Agentes from "../Pages/Agentes";
import TablaHonorarios from "../Pages/TablaHonorarios";
import ModulosVista from "../Pages/ModulosVista";
import LiquidacionesPendientes from "../Pages/Liquidaciones-Pendientes";
import Detail from "../Pages/Detail";
import OrdenesDetail from "../Pages/OrdenesDetail";
import  VerOrden  from "../Pages/VerOrdenes";
import Archivos from "../Pages/Archivos";
import ErrorPage from "../Pages/ErrorPage";

const RedirectComponent = () => {
  const location = useLocation();

  switch (location.pathname) {
    case "/agentes":
      return <Navigate to="/agentes/ver-agentes" />;

    case "/operativos":
      return <Navigate to="/operativos/ver-operativos" />;

    case "/honorarios":
      return <Navigate to="/honorarios/variables" />;

    case "/ordenes":
      return <Navigate to="/ordenes/ver-ordenes" />;
  }

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/agentes",
        element: <RedirectComponent />,
        children: [
          {
            path: "/agentes/ver-agentes",
            element: <Agentes />,
          },
          {
            path: "/agentes/crear-agente",
            element: <CrearAgente />,
          },
          {
            path: "/agentes/agente/:id",
            element: <Detail />,
          },
        ],
      },
      {
        path: "/operativos",
        element: <RedirectComponent />,
        children: [
          {
            path: "/operativos/ver-operativos",
            element: <Operativos />,
          },
          { path: "/operativos/nuevo-operativo", element: <CrearOperativo /> },
        ],
      },
      {
        path: "/honorarios",
        element: (
          <div className="container p-4">
            <RedirectComponent />
          </div>
        ),
        children: [
          {
            path: "/honorarios/variables",
            children: [
              {
                index: true,
                element: <TablaHonorarios />,
              },
            ],
          },
        ],
      },
      {
        path: "/modulos",
        element: <ModulosVista />,
      },
      {
        path: "/ordenes",
        element: (
          <div className="container p-4">
            <RedirectComponent />
          </div>
        ),
        children: [
          {
            path: "/ordenes/pendientes",
            element: <LiquidacionesPendientes />,
          },
          {
            path: "/ordenes/ver-ordenes",
            element: <VerOrden />,
          },
          {
            path: "/ordenes/eliminar-ordenes",
            element: <h1>eliminar ordenes</h1>,
          },
          {
            path: "/ordenes/ver-ordenes/:liquidacion_id",
            element: <OrdenesDetail />,
          },
        ],
      },
      {
        path: "/archivos",
        element: <Archivos />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
