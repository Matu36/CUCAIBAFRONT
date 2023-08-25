import React from "react";
import PostOperativos from "../components/PostOperativos";
import Layout from "../components/Layout/LayoutContainer";

export const CrearOperativo = () => {
  return (
    <Layout
      Titulo="Crear Operativo"
      Subtitulo="Completa todos los campos para crear el Operativo"
    >
      <PostOperativos />
      <br />
    </Layout>
  );
};
