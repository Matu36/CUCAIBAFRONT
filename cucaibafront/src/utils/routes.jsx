import { createBrowserRouter } from "react-router-dom";

import { Home } from "../Pages/Home";
import Layout from "../components/Layout/Layout";
import Operativos from "../Pages/Operativos";
import CrearAgente from "../Pages/Crear-Agente";
import { CrearOperativo } from "../Pages/Crear-Operativo";
import { CrearHonorarios } from "../Pages/Crear-Honorarios";
import Agentes from "../Pages/Agentes";
import LayoutHonorarios from "../components/Layout/LayoutHonorarios";
import TablaHonorarios from "../Pages/TablaHonorarios";
import AsignarAgente from "../Pages/AsignarAgente";
import ModulosVista from "../Pages/ModulosVista";
import LiquidacionesPendientes from "../Pages/Liquidaciones-Pendientes";
import Detail from "../Pages/Detail";
import OrdenPendiente from "../components/OrdenPendiente";
import OrdenesDetail from "../Pages/OrdenesDetail";
import { VerOrdenes } from "../Pages/Ver-Ordenes";
import Archivos from "../Pages/Archivos";

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
        path: "operativos",
        children: [
          {
            path: "/operativos/ver-operativos",
            element: <Operativos />,
          },
          { path: "/operativos/nuevo-operativo", element: <CrearOperativo /> },
        ],
      },
      {
        path: "honorarios",
        element: <LayoutHonorarios />,
        children: [
          {
            path: "/honorarios/variables",
            children: [
              {
                index: true,
                element: <TablaHonorarios />,
              },
              {
                path: "/honorarios/variables/crear-honorario",
                element: <CrearHonorarios />,
                children: [
                  {
                    index: true,
                    element: <AsignarAgente />,
                  },
                  {
                    path: "/honorarios/variables/crear-honorario/:id/agregar",
                    element: (
                      <>
                        <div>
                          <h1>Agregar honorario al Agente</h1>
                          <hr />
                        </div>
                        <TablaHonorarios />
                      </>
                    ),
                  },
                ],
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
        path: "/liquidaciones",
        element: <LiquidacionesPendientes />,
      },
      {
        path: "ordenes",
        element: <LayoutHonorarios />,
        children: [
          {
            path: "/ordenes/pendientes",
            element: <LiquidacionesPendientes />,
          },
          {
            path: "/ordenes/ver-ordenes",
            element: <VerOrdenes />,
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
    ],
  },
]);

export default router;
