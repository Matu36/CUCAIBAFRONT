import React from "react";
import PostAgentes from "../components/PostAgentes";

const CrearAgente = () => {
  return (
    <div className="container p-4">
      <div>
        <h1>Creación de Agente</h1>
        <h6 className="subtitulo" style={{ color: "#5DADE2" }}>
          Ingresa el DNI de la persona y se completarán automáticamente los
          campos para crear el agente
        </h6>
        <hr />
      </div>
      <PostAgentes />
      <br />
    </div>
  );
};

export default CrearAgente;
