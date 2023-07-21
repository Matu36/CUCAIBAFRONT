import { postOperativo } from "../Redux/Actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";
import "../assets/styles/detalle.css";
import BackButton from "../components/UI/BackButton";

const PostOperativos = () => {
  let dispatch = useDispatch();

  //---------------------------- CREACION OPERATIVO ---------------------------- //

  const [operativo, setOperativo] = useState({
    referencia: "",
    fecha: "",
    descripcion: "",
    fechapago: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (
      operativo.referencia &&
      operativo.fecha
      // operativo.fechapago
    ) {
      const newOperativo = {
        ...operativo,
        fecha: operativo.fecha.replace("T", " "),
      };

      dispatch(postOperativo(newOperativo));
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "El operativo ha sido creado",
        showConfirmButton: false,
        timer: 2000,
      });
      // window.location.reload();
      setOperativo({
        referencia: "",
        fecha: "",
        descripcion: "",
        // fechapago: ""
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
    <form onSubmit={handleOnSubmit}>
      <div className="card">
      <div className="mb-3">
        <label for="inputReferncia" class="form-label">
          Proceso de Donación
        </label>
        <input
          type="text"
          class="form-control"
          id="inputReferencia"
          aria-describedby="ReferenciaHelp"
          name="referencia"
          value={operativo.referencia}
          autoComplete="off"
          placeholder="N° de Proceso de Donación"
          onChange={(e) =>
            setOperativo({ ...operativo, referencia: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label for="inputFecha" className="form-label">
          Fecha
        </label>
        <input
          type="datetime-local"
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
        <label for="inputDescripción" className="form-label">
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
          onChange={(e) =>
            setOperativo({ ...operativo, descripcion: e.target.value })
          }
        />
      </div>
      <div className="d-flex justify-content-between">
      <div>
      <BackButton />
      </div>
      <div>
      <button
        type="submit"
        className="btn btn-success btn-md" 
      >
        Agregar Operativo
      </button>
      </div>
      </div>
      </div>
     
    </form>
  );
};

export default PostOperativos;
