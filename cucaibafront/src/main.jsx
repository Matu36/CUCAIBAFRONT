import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store } from "../src/Redux/Store/index.js";
import { Provider } from "react-redux";
import Layout from "./components/Layout/Layout.jsx";
import GetAgentes from "./components/GetAgentes.jsx";
import { Home } from "./Pages/Home.jsx";
import PostAgentes from "./components/PostAgentes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
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
            element: <PostAgentes />
          }

        ]
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
