import React from "react";
import GetAgentes from "../components/GetAgentes";
import BackButton from "../components/UI/BackButton";

const Agentes = () => {
  return (
    <div className="container p-4">
      <GetAgentes />
      <br />
      <BackButton />
    </div>
  );
};

export default Agentes;
