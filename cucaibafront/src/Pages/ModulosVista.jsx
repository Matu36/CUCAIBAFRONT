import React from "react";
import Modulos from "../components/Modulos";
import Layout from "../components/Layout/LayoutContainer";

const ModulosVista = () => {
  return (
    <Layout Titulo="Módulos" Subtitulo="Listado de todos los módulos">
      <Modulos />
      <br />
    </Layout>
  );
};

export default ModulosVista;
