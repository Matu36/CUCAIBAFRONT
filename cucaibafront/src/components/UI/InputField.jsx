import React from "react";

const InputField = ({
  label,
  inputType,
  inputKey,
  value,
  handleChange,
  error,
  required,
  ...props
}) => {
  return (
    <div className="mb-3" style={{ flex: 1 }}>
      <label htmlFor={label} className="form-label">
        {label}: {required && <span style={{ color: "red" }}> * </span>}
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
      {error && !props.disabled && (
        <p style={{ color: "red" }}>
          El campo no puede estar vacio y debe ser de tipo{" "}
          {inputType == "text" ? "texto" : "numerico"}
        </p>
      )}
    </div>
  );
};

export default InputField;
