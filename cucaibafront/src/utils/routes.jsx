import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../Pages/Home';
import Layout from '../components/Layout/Layout';
import GetAgentes from '../components/GetAgentes';
import PostAgentes from '../components/PostAgentes';
import GetOperativos from '../components/GetOperativos';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/agentes',
        children: [
          {
            path: '/agentes/ver-agentes',
            element: <GetAgentes />,
          },
          {
            path: '/agentes/crear-agente',
            element: <PostAgentes />,
          },
        ],
      },
      {
        path: '/operativos',
        children: [
          {
            path: '/operativos/ver-operativos',
            element: <GetOperativos />,
          },
        ],
      },
    ],
  },
]);

export default router;
