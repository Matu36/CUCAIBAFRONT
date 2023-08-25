import React from "react";
import PostAgentes from "../components/PostAgentes";
import Layout from "../components/Layout/LayoutContainer";

const CrearAgente = () => {
  return (
    <Layout
      Subtitulo="Ingresa el DNI de la persona y se completarán automáticamente los
    campos para crear el agente"
      Titulo="Creación de Agente"
    >
      <PostAgentes />
      <br />
    </Layout>
  );
};

export default CrearAgente;
