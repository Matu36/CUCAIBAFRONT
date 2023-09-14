import React from "react";

// Usado en el componente Ver-Ordenes

const InputField = ({
  label,
  inputType,
  inputKey,
  value,
  handleChange,
  error,
  min,
  max,
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
          El campo no puede estar vacío y debe ser de tipo{" "}
          {inputType === "text" ? "texto" : "numérico"}
        </p>
      )}
      {inputKey === "anio_acto" && (
        <p style={{ color: "red" }}>
          {error === "minmax" ? (
            "El año no puede ser anterior al 2022 y posterior al año actual"
          ) : (
            null
          )}
        </p>
      )}
    </div>
  );
};

export default InputField;
