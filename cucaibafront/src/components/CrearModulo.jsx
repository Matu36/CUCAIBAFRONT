import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import CreatableSelect from "react-select/creatable";
import "../assets/styles/style.css";
import { validateFecha } from "../utils/Validaciones";
import { useModulos } from "../hooks/useModulos";
import { FaPlus } from "react-icons/fa";

const NUMBER_REGEX = /^[0-9]+$/;
const STRING_REGEX = /^[a-zA-Z].*(?:\d| )*$/;
//Componente para crear el módulo

const CrearModulo = ({ handleCerrarFormulario, data }) => {
  const { mutate } = useModulos().crearModulo;
  const [create, setCreate] = useState(false);
  const [options, setOptions] = useState(
    data.map((m) => ({
      value: m.id,
      label: m.descripcion,
    }))
  );
  const [selectValue, setSelectValue] = useState(null);

  const crearModuloButtonRef = useRef(null);

  const [showError, setShowError] = useState({
    fecha: false,
    descripcion: 0,
    valor: false,
  });

  //CREACION DE MODULO //
  const [modulo, setModulo] = useState({
    valor: "",
    descripcion: "",
    fechaDesde: "",
    id: 0,
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      crearModuloButtonRef.current.click();
    }
  };

  const handleCreate = (label) => {
    const newOption = {
      label,
      value: `${new Date().getTime()}-create`,
    };

    setSelectValue(newOption);

    setShowError({ ...showError, descripcion: 0 });
    setModulo({ ...modulo, id: newOption.value, descripcion: label });
    setOptions([...options, newOption]);
    setCreate(true);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (modulo.valor && modulo.descripcion && modulo.fechaDesde) {
      if (showError.fecha) return;

      const newModulo = {
        ...modulo,
        descripcion: modulo.descripcion.toUpperCase(),
      };

      mutate(newModulo);

      setModulo({
        valor: "",
        descripcion: "",
        fechaDesde: "",
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Por favor, completa todos los campos",
        showConfirmButton: true,
      });
    }
  };

  useEffect(() => {
    if (selectValue) {
      setShowError({
        ...showError,
        descripcion: selectValue.value.toString().includes("create") ? 0 : 1,
      });
    }
  }, [selectValue]);

  return (
    <div
      className="form-container pt-2"
      style={{
        padding: "20px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        border: "1px solid gray",
        minWidth: window.innerWidth < 1000 && "90vw",
        borderRadius: "15px",
      }}
    >
      <form
        onSubmit={handleOnSubmit}
        className="row g-3 pt-4"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target !== crearModuloButtonRef.current) {
            e.preventDefault();
          }
        }}
      >
        <div
          className="modulo"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginLeft: 0,
            color: "#5DADE2",
          }}
        >
          <h6>CREAR MÓDULO</h6>
        </div>
        <hr
          style={{
            margin: "10px 0",
            border: "none",
            borderBottom: "5px solid #5DADE2",
          }}
        />
        <div className="col-md-6"></div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="descripcion">
              Descripción{" "}
              <span
                style={{ color: "red", marginLeft: "5px", fontSize: "20px" }}
              >
                *
              </span>
            </label>
            <CreatableSelect
              options={options}
              value={selectValue}
              classNamePrefix="select2"
              menuIsOpen
              classNames={{ container: () => "select2-container" }}
              onInputChange={(e) => {
                if (e.length > 0) {
                  let result = 0;

                  if (e.endsWith(" ") || !STRING_REGEX.test(e)) {
                    result = 2;
                  }

                  setShowError({
                    ...showError,
                    descripcion: result,
                  });
                }
              }}
              onChange={(e) => {
                setSelectValue(e);
                setModulo({
                  ...modulo,
                  descripcion: e.label,
                  id: e ?? 0,
                });
              }}
              onCreateOption={handleCreate}
              formatCreateLabel={(input) => (
                <div className="d-flex align-items-center gap-2 justify-content-between">
                  <span>"{input}"</span>{" "}
                  <div>
                    <span className="text-decoration-underline">
                      Agregar nueva
                    </span>
                    <FaPlus className="ms-2" size="0.75rem" />
                  </div>
                </div>
              )}
            />
            {/* <input
              onKeyDown={handleKeyDown}
              type="text"
              className="form-control"
              name="descripcion"
              value={modulo.descripcion}
              autoComplete="off"
              placeholder="Descripción"
              onChange={(e) => {
                setModulo({ ...modulo, descripcion: e.target.value });
                setShowError({
                  ...showError,
                  descripcion:
                    e.target.value.endsWith(" ") ||
                    !STRING_REGEX.test(e.target.value),
                });
              }}
            /> */}
            {showError.descripcion == 2 && (
              <div style={{ color: "red" }}>
                <p>* La descripción no puede estar vacia</p>
                <p>* La descripción no puede contener espacios sueltos</p>
              </div>
            )}
            {showError.descripcion == 1 && (
              <div style={{ color: "red" }}>
                <p>* El módulo ya existe</p>
              </div>
            )}
          </div>
          <div className="col-md-3">
            <label htmlFor="valor">
              Valor{" "}
              <span
                style={{ color: "red", marginLeft: "5px", fontSize: "20px" }}
              >
                *
              </span>
            </label>
            <input
              onKeyDown={handleKeyDown}
              type="number"
              className="form-control"
              name="valor"
              value={modulo.valor}
              autoComplete="off"
              placeholder="Valor"
              onChange={(e) => {
                const newValue = e.target.value;
                setShowError({
                  ...showError,
                  valor: !NUMBER_REGEX.test(newValue),
                });
                if (newValue === "" || newValue >= 0) {
                  setModulo({
                    ...modulo,
                    valor: newValue === "" ? "" : Number(newValue),
                  });
                }
              }}
            />
            {showError.valor && (
              <div style={{ color: "red" }}>
                El valor solo puede ser númerico y no estar vacio
              </div>
            )}
          </div>
          <div className="col-md-3">
            <label htmlFor="fechaDesde">
              Fecha Desde{" "}
              <span
                style={{ color: "red", marginLeft: "5px", fontSize: "20px" }}
              >
                *
              </span>
            </label>
            <input
              onKeyDown={handleKeyDown}
              type="date"
              className="form-control"
              name="fechaDesde"
              min="2022-01-01"
              value={modulo.fechaDesde}
              autoComplete="off"
              placeholder="Fecha Desde"
              onChange={(e) => {
                setModulo({
                  ...modulo,
                  fechaDesde: e.target.value,
                });
                setShowError({
                  ...showError,
                  fecha: validateFecha(e.target.value)
                    ? 1
                    : e.target.value < e.target.min
                    ? 2
                    : 0,
                });
              }}
            />
            {showError.fecha == 1 ? (
              <div style={{ color: "red" }}>
                La fecha no puede ser posterior al día de hoy
              </div>
            ) : (
              showError.fecha == 2 && (
                <div style={{ color: "red" }}>
                  La fecha no puede ser anterior al año 2022
                </div>
              )
            )}
          </div>
        </div>
        <hr
          style={{
            marginTop: "4rem",
            border: "none",
            borderBottom: "5px solid #5DADE2",
          }}
        />
        <div className="d-flex justify-content-end">
          <button
            onClick={handleCerrarFormulario}
            type="submit"
            className="btn btn-outline-secondary pb-2"
            style={{ marginRight: "10px" }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            ref={crearModuloButtonRef}
            className="btn btn-guardar pt-2"
            disabled={
              showError.fecha ||
              showError.descripcion != 0 ||
              showError.valor ||
              !modulo.valor ||
              !modulo.fechaDesde ||
              !create
            }
          >
            Crear Modulo
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearModulo;
