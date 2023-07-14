import React from "react";
import { Link } from "react-router-dom";
import {ImArrowLeft} from "react-icons/im";

const BackButton = () => {
  return (
    <Link to="#" onClick={() => window.history.back()} className="btn btn-link">
      <i className="bi bi-arrow-left"> <ImArrowLeft/> </i>
    </Link>
  );
};

export default BackButton;
