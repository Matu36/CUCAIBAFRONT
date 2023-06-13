import {createBrowserRouter} from "react-router-dom";

import {Home} from "../Pages/Home";
import Layout from "../components/Layout/Layout";
import GetOperativos from "../components/GetOperativos";
import CrearAgente from "../Pages/Crear-Agente";
import { CrearOperativo } from "../Pages/Crear-Operativo";
import { CrearHonorarios } from "../Pages/Crear-Honorarios";
import Agentes from "../Pages/Agentes";

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
            element: <GetOperativos />,
          },
          {path: "/operativos/nuevo-operativo", element: <CrearOperativo />},
        ],
      },
      {
        path: "honorarios",
        children: [
          {
            path:"/honorarios/variables",
            element: <CrearHonorarios />
          }
        ]
        }
      
    ],
  },
  
]);

export default router;
