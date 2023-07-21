import React from "react";

const Modal = ({ title, referenceID, children }) => {
  return (
    <div
      className="modal fade modal-lg"
      id={`${referenceID}`}
      tabIndex="-1"
      aria-labelledby={`${referenceID}`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Salir
            </button>
            <button type="button" className="btn btn-outline-secondary">
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
