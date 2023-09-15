import React from "react";
import { FaFilter } from "react-icons/fa";
import "../styles/expandableFilter.css";

const ExpandableFilters = ({ children }) => {
  return (
    <div className="mb-3">
      {" "}
      <button
        class="btn btn-outline-secondary btn-round mb-2 py-1 d-flex align-items-center gap-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        <FaFilter />
        Filtros
      </button>
      <div class="collapse" id="collapseExample">
        {children}
      </div>
    </div>
  );
};

export default ExpandableFilters;
