import React from "react";

const Toast = ({ msg }) => {
  const showToast = () => {
    var toastElList = [].slice.call(document.querySelectorAll(".toast"));
    var toastList = toastElList.map(function (toastEl) {
      return new bootstrap.Toast(toastEl);
    });
    toastList.forEach((toast) => toast.show());
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={showToast}
        id="liveToastBtn"
      >
        Show live toast
      </button>

      <div className="position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToast"
          className="toast hide bg-success text-white"
          role="alert"
          aria-live="polite"
          aria-atomic="true"
          data-autohide="true"
          data-animation="true"
        >
          <div className="d-flex align-items-center justify-content-between toast-body">
            {msg}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Toast;
