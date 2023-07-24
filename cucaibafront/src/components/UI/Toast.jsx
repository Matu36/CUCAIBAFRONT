import React, { useEffect, useRef } from "react";

const Toast = ({ msg, show }) => {
  const ref = useRef();

  let toastEl = document.getElementById("liveToast");
  let toast = bootstrap.Toast.getOrCreateInstance(toastEl);

  // useEffect(() => {
  //   toast.show();
  // }, [show]);

  return (
    <div className="position-fixed bottom-0 end-0 p-3">
      <div
        ref={ref}
        id="liveToast"
        className="toast bg-success text-white"
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        data-autohide="true"
        data-bs-delay="2500"
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
  );
};

export default Toast;
