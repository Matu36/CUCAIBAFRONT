import React from "react";
import BackButton from "../components/UI/BackButton";
import DetalleAgente from "../components/DetalleAgente";

const Detail = () => {
  return (
    <div className="container p-4">
      <DetalleAgente />
      <br />
      <BackButton />
    </div>
  );
};

export default Detail;
