import React from "react";
import PostAgentes from "../components/PostAgentes";

const CrearAgente = () => {
  return (
    <div className="container p-4 card mt-5">
      <div>
        <span className="Titulo">Creación de Agente </span>
        <div>
          <span className="Subtitulo">
            Ingresa el DNI de la persona y se completarán automáticamente los
            campos para crear el agente
          </span>
        </div>
        <hr />
      </div>
      <PostAgentes />
      <br />
    </div>
  );
};

export default CrearAgente;
