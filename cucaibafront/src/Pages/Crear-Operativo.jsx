import React from "react";
import PostOperativos from "../components/PostOperativos";

export const CrearOperativo = () => {
  return (
    <div className="container p-4">
      <div>
        <h1> Crear Operativo</h1>
        <h5 className="subtitulo" style={{ color: "#5DADE2" }}>
          Completa todos los campos para crear el Operativo
        </h5>
        <hr />
      </div>

      <PostOperativos />
      <br />
    </div>
  );
};
