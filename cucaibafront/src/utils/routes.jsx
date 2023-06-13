import {createBrowserRouter} from "react-router-dom";

import {Home} from "../Pages/Home";
import Layout from "../components/Layout/Layout";
import GetAgentes from "../components/GetAgentes";
import GetOperativos from "../components/GetOperativos";
import PostOperativos from "../components/PostOperativos";
import CrearAgente from "../Pages/Crear-Agente";
import { CrearOperativo } from "../Pages/Crear-Operativo";
import { CrearHonorarios } from "../Pages/Crear-Honorarios";

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
            element: <GetAgentes />,
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
