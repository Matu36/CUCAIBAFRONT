import React from "react";


export function validateDNI(inputValue) {
  const dniInput = document.getElementById("inputDNI");
  const errorMessage = document.getElementById("dniErrorMessage");

  if (inputValue.length < 8 || isNaN(inputValue)) {
    dniInput.style.border = "1px solid red";
    errorMessage.style.display = "block";
  } else {
    dniInput.style.border = "1px solid #ced4da";
    errorMessage.style.display = "none";
  }
};


