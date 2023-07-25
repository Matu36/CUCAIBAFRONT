import React from "react";

let toastEl = document.getElementById("liveToast");

export const handleToast = () => {
  let toast = new bootstrap.Toast(toastEl, {
    animation: true,
    autohide: true,
    delay: 2500,
  });
  toast.show();
};

const Toast = ({ msg }) => {
  return (
    <div className="position-fixed bottom-0 end-0 p-3">
      <div
        id="liveToast"
        className="toast d-flex align-items-center justify-content-between px-3 text-bg-primary"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{ zIndex: 1000 }}
      >
        <div className="toast-body">
          <strong className="me-auto">{msg}</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
