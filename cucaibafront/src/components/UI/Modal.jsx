import React from "react";

//Modal que se utiliza en los componentes: Ver-Ordenes, RowExpandedComponent, Liquidaciones

const Modal = ({
  title,
  referenceID,
  children,
  customFooter,
  size = "modal-lg",
  handleClose,
  isStatic,
}) => {
  return (
    <div
      className={`modal fade ${size}`}
      id={`${referenceID}`}
      tabIndex="-1"
      aria-labelledby={`${referenceID}`}
      aria-hidden="true"
      data-bs-backdrop={isStatic && "static"}
    >
      <div className="modal-dialog">
        <div className="modal-content bg-white">
          <div className="modal-header">
            <div className="modulo">
              <h6>{title.toUpperCase()}</h6>
            </div>
            <hr className="hrstyle" />
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
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
