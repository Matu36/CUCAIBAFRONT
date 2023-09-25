import React from "react";

//Modal que se utiliza en los componentes: Ver-Ordenes, RowExpandedComponent, Liquidaciones

const Modal = ({
  title,
  referenceID,
  children,
  customFooter,
  size = "modal-lg",
  handleClose,
}) => {
  return (
    <div
      className={`modal fade ${size}`}
      id={`${referenceID}`}
      tabIndex="-1"
      aria-labelledby={`${referenceID}`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content bg-white">
          <div className="modal-header">
            <h4 className="modal-title" style={{ color: "#5DADE2" }}>
              {title}
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          {!customFooter && (
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose ?? null}
              >
                Salir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
