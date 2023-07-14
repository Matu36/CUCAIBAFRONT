import React from "react";

export const validateNumberInput = (inputValue) => {
  const onlyNumbers = inputValue.replace(/[^0-9]/g, "");
  return onlyNumbers;
};


