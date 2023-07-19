import React from "react";
import PostOperativos from "../components/PostOperativos";
import BackButton from "../components/UI/BackButton";

export const CrearOperativo = () => {
  return (
    <div className="container p-4">
      <div>
        <h1> Crear Operativo</h1>
        <hr />
      </div>

      <PostOperativos />
      <br />
      <BackButton />
    </div>
  );
};
