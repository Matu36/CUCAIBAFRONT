import React, { useState, useRef } from "react";
import Swal from "sweetalert2";
import { postModulo } from "../Redux/Actions";
import { useDispatch } from "react-redux";
import "../assets/styles/style.css";
import { validateFecha } from "../utils/Validaciones";

//Componente para crear el módulo

const CrearModulo = ({ handleCerrarFormulario }) => {
  const dispatch = useDispatch();

  const crearModuloButtonRef = useRef(null);

  const [showError, setShowError] = useState({ fecha: false });

 
  //CREACION DE MODULO //
  const [modulo, setModulo] = useState({
    valor: "",
    descripcion: "",
    fechaDesde: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (modulo.valor && modulo.descripcion && modulo.fechaDesde) {
      if (showError.fecha) return;

      const newModulo = {
        ...modulo,
      };

      dispatch(postModulo(newModulo));

      await Swal.fire({
        position: "center",
        icon: "success",
        title: "El modulo ha sido creado",
        showConfirmButton: false,
        timer: 3000,
      });

      window.close();
  
  window.location.reload();

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
      <form onSubmit={handleOnSubmit} className="row g-3 pt-4" onKeyDown={(e) => {
          
          if (e.key === "Enter" && e.target !== crearModuloButtonRef.current) {
            e.preventDefault();
          }
        }}>
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
        <div className="col-md-6">
         
        </div>

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
            <input
                onKeyDown={(e) => {
                 
                  if (e.key === "Enter") {
                    e.preventDefault();
                    crearModuloButtonRef.current.click();
                  }
                }}
              type="text"
              className="form-control"
              name="descripcion"
              value={modulo.descripcion}
              autoComplete="off"
              placeholder="Descripción"
              onChange={(e) => {
                setModulo({ ...modulo, descripcion: e.target.value });
              }}
            />
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
                onKeyDown={(e) => {
                 
                  if (e.key === "Enter") {
                    e.preventDefault();
                    crearModuloButtonRef.current.click();
                  }
                }}
              type="number"
              className="form-control"
              name="valor"
              value={modulo.valor}
              autoComplete="off"
              placeholder="Valor"
              onChange={(e) => {
                const newValue = e.target.value;
                if (
                  newValue === "" ||
                  (newValue >= 0)
                ) {
                  setModulo({
                    ...modulo,
                    valor: newValue === "" ? "" : Number(newValue),
                  });
                }
              }}
            />
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
                onKeyDown={(e) => {
                 
                  if (e.key === "Enter") {
                    e.preventDefault();
                    crearModuloButtonRef.current.click();
                  }
                }}
              type="date"
              className="form-control"
              name="fechaDesde"
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
                  fecha: validateFecha(e.target.value),
                });
              }}
            />
            {showError.fecha && (
              <div style={{ color: "red" }}>
                La fecha no puede ser posterior al día de hoy
              </div>
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
              !modulo.descripcion ||
              !modulo.valor ||
              !modulo.fechaDesde ||
              showError.fecha
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
