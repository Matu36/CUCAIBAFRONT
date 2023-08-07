import React from "react";

const InputField = ({
  label,
  inputType,
  inputKey,
  value,
  handleChange,
  ...props
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={label} className="form-label">
        {label}:
      </label>
      <input
        type={inputType}
        className="form-control"
        id={`id${label.trim("")}`}
        aria-describedby={`input${label.trim("")}Help`}
        name={inputKey}
        value={value}
        autoComplete="off"
        placeholder={label}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};

export default InputField;
