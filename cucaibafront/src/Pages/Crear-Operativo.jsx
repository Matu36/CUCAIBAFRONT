import React from "react";
import PostOperativos from "../components/PostOperativos";

export const CrearOperativo = () => {
  return (
    <div className="container p-4">
      <div>
        <span className="Titulo"> Crear Operativo</span>
        <div>
        <span className="Subtitulo">
          Completa todos los campos para crear el Operativo
        </span>
        </div>
        <hr />
      </div>

      <PostOperativos />
      <br />
    </div>
  );
};
