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
import GetAgentes from "../components/GetAgentes";

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
                path: "/honorarios/variables",
                element: <TablaHonorarios />,
              },
              {
                path: "/honorarios/variables/crear-honorario",
                element: <CrearHonorarios />,
                children: [
                  {
                    index: true,
                    element: (
                      <>
                        <div>
                          <h1>Asignar Agente al Operativo</h1>
                          <hr />
                          <p>
                            <i>(Solo uno)</i>
                          </p>
                          <br />
                        </div>
                        <TablaHonorarios
                          selectableRows
                          selectableRowsNoSelectAll
                          selectableRowsSingle
                          striped
                          selectableRowsHighlight
                        />
                      </>

                      // <GetAgentes selectableRows
                      //   selectableRowsNoSelectAll
                      //   selectableRowsSingle
                      //   selectableRowsHighlight/>
                    ),
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
    ],
  },
]);

export default router;
