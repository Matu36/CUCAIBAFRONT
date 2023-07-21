import React from "react";
import { useNavigate } from "react-router-dom";
import { ImArrowLeft } from "react-icons/im";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className="btn outline-primary">
      <i className="bi bi-arrow-left">
        {" "}
        <ImArrowLeft />{" "}
      </i>
    </button>
  );
};

export default BackButton;
