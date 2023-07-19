import React from "react";
import Modulos from "../components/Modulos";
import BackButton from "../components/UI/BackButton";

const ModulosVista = () => {
  return (
    <div className="container p-4">
      <Modulos />
      <br />
      <BackButton />
    </div>
  );
};

export default ModulosVista;
