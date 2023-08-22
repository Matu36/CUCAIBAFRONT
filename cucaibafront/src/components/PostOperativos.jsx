import { useState } from "react";
import Swal from "sweetalert2";
import "../assets/styles/detalle.css";
import BackButton from "../components/UI/BackButton";
import { useOperativo } from "../hooks/useOperativo";
import { validateFecha } from "../utils/Validaciones";


//Componente para crear el OPERATIVO

const PostOperativos = () => {
  const { mutate } = useOperativo().operativoMutation;

  const [showError, setShowError] = useState({
    referencia: false,
    fecha: false,
  });

  const validateString = (inputName, value) => {
    switch (inputName) {
      case "referencia":
        const regexReferencia = /^[0-9]+$/;
        if (!regexReferencia.test(value)) {
          setShowError({ ...showError, referencia: true });
        } else {
          setShowError({ ...showError, referencia: false });
        }
        break;

    }
  };

  //---------------------------- CREACION OPERATIVO ---------------------------- //

  const [operativo, setOperativo] = useState({
    referencia: "",
    fecha: "",
    descripcion: "",
    fechapago: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (operativo.referencia && operativo.fecha) {
      if (showError.fecha) {
        return;
      }

      const newOperativo = {
        ...operativo,
        fecha: operativo.fecha,
      };

      mutate(newOperativo);

      
      setOperativo({
        referencia: "",
        fecha: "",
        descripcion: "",
      });
      setShowError({ fecha: false, referencia: false });
    } else {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Por favor, completa todos los campos",
        showConfirmButton: true,
      });
    }
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <br />
      <div className="card">
        <div className="mb-3">
          <label htmlFor="inputReferncia" className="form-label">
            Proceso de Donación <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="inputReferencia"
            aria-describedby="ReferenciaHelp"
            name="referencia"
            value={operativo.referencia}
            autoComplete="off"
            placeholder="N° de Proceso de Donación"
            onChange={(e) => {
              setOperativo({ ...operativo, referencia: e.target.value });
              validateString(e.target.name, e.target.value);
            }}
          />
          {showError.referencia && (
            <div style={{ color: "red" }}>
              El proceso de donación no tener letras
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="inputFecha" className="form-label">
            Fecha <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="date"
            className="form-control"
            id="inputFecha"
            aria-describedby="FechaHelp"
            name="Fecha"
            value={operativo.fecha}
            autoComplete="off"
            placeholder="Fecha del operativo"
            onChange={(e) => {
              setOperativo({ ...operativo, fecha: e.target.value });
              setShowError({
                ...showError,
                fecha: validateFecha(e.target.value),
              });
            }}
          />
          {showError.fecha && (
            <div style={{ color: "red" }}>
              No se puede elegir una fecha posterior a la de hoy
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="inputDescripción" className="form-label">
            Descripción
          </label>
          <input
            type="text"
            className="form-control"
            id="inputDescripción"
            aria-describedby="DescripciónHelp"
            name="descripción"
            value={operativo.descripcion}
            autoComplete="off"
            placeholder="Descripción"
            onChange={(e) => {
              setOperativo({ ...operativo, descripcion: e.target.value });
              validateString(e.target.name, e.target.value);
            }}
          />
        </div>
        <br />
        <br />

        <div className="d-flex justify-content-between">
          <div>
            <BackButton />
          </div>
          <div>
            <button type="submit" className="btn btn-success btn-md">
              Agregar Operativo
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostOperativos;
