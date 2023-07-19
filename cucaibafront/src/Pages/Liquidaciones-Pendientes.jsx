import React from "react";
import Liquidaciones from "../components/Liquidaciones";
import BackButton from "../components/UI/BackButton";

const LiquidacionesPendientes = () => {
  return (
    <div className="container p-4">
      <Liquidaciones />
      <br />
      <BackButton />
    </div>
  );
};

export default LiquidacionesPendientes;
