import { postOperativo } from "../Redux/Actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";
import "../assets/styles/detalle.css";
import BackButton from "../components/UI/BackButton";
import { useMutation } from "@tanstack/react-query";
import { OperativosAPI } from "../api/OperativosAPI";

const PostOperativos = () => {
  let dispatch = useDispatch();

  const { mutate } = useMutation(
    async (data) => {
      return await OperativosAPI.post("", data);
    },
    {
      onSuccess: () => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "El operativo ha sido creado",
          showConfirmButton: false,
          timer: 2000,
        });
      },
      onError: () => {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Ya existe un operativo con ese Proceso de Donación",
          showConfirmButton: false,
          timer: 2000,
        });
      },
    }
  );

  const [showError, setShowError] = useState({
    referencia: false,
    // descripcion: false, //Momentaneamente
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

      // case "descripción":
      //   const regexDescripcion = /^[A-Za-z\s]+$/;
      //   if (!regexDescripcion.test(value)) {
      //     setShowError({ ...showError, descripcion: true });
      //   } else {
      //     setShowError({ ...showError, descripcion: false });
      //   }
      //   break;
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
      const newOperativo = {
        ...operativo,
        fecha: operativo.fecha,
      };

      // console.log(newOperativo);

      // dispatch(postOperativo(newOperativo));
      mutate(newOperativo);

      // window.location.href = "http://localhost:5173/operativos/ver-operativos";

      setOperativo({
        referencia: "",
        fecha: "",
        descripcion: "",
      });
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
            onChange={(e) =>
              setOperativo({ ...operativo, fecha: e.target.value })
            }
          />
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
          {/* {showError.descripcion && (
            <div style={{ color: "red" }}>
              La descripción no pueder estar vacía y no debe contener números
            </div>
          )} */}
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
