import React from "react";
import { useNavigate } from "react-router-dom";

// Boton de volver a la página anterior

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="btn btn-outline-dark"
    >
      Volver
    </button>
  );
};

export default BackButton;
