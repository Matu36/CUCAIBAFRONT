import React from "react";

const Dropdown = () => {
  return (
    <div className="dropdown">
      <button
        className="btn dropdown-toggle dropdown-button"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Seleccionar
      </button>
      <div
        className="dropdown-menu dropdown-w"
        aria-labelledby="dropdownMenuButton"
      >
        <a
          class="dropdown-item preload"
          aria-labelledby="dropdownMenuButton"
          href="#"
        >
          <i class="fas fa-edit fa-fw"></i> Modificar
        </a>

        <a
          class="dropdown-item preload"
          aria-labelledby="dropdownMenuButton"
          href="#"
        >
          <i class="fa fa-search fa-fw"></i> Ver
        </a>

        <a
          class="dropdown-item js-modal-baja"
          aria-labelledby="dropdownMenuButton"
          href="#"
        >
          <i class="fa fa-recycle fa-fw"></i> Baja
        </a>
      </div>
    </div>
  );
};

export default Dropdown;
