import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getCategorias, getTipoModulo, postModulo } from "../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import "../assets/styles/style.css";

const CrearModulo = ({ handleCerrarFormulario }) => {
  const dispatch = useDispatch();

  const categorias = useSelector((state) => state.categorias);
  const tipoModulo = useSelector((state) => state.TipoModulo);
  let primerArreglo = [];
  if (categorias.length > 1) {
    primerArreglo = categorias[1][0];
  }

  let destructuring = [];
  if (tipoModulo.length > 1) {
    destructuring = tipoModulo[1][0];
  }

  useEffect(() => {
    dispatch(getCategorias());
  }, []);

  useEffect(() => {
    dispatch(getTipoModulo());
  }, []);

  //CREACION DE MODULO //
  const [modulo, setModulo] = useState({
    tipo: "",
    categoria: "",
    valor: "",
    descripcion: "",
    fechaDesde: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (
      modulo.tipo &&
      modulo.categoria &&
      modulo.valor &&
      modulo.descripcion &&
      modulo.fechaDesde
    ) {
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
      window.location.reload();
      setModulo({
        tipo: "",
        categoria: "",
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

  function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  function padZero(number) {
    return number.toString().padStart(2, "0");
  }

  return (
    <div
      className="form-container pt-2"
      style={{
        padding: "20px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        border: "1px solid gray",
      }}
    >
      <form onSubmit={handleOnSubmit} className="row g-3 pt-4">
        <div
          className="modulo"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginLeft: 0,
            color: "#5DADE2",
          }}
        >
          <h6>CREAR MODULO</h6>
        </div>
        <hr
          style={{
            margin: "10px 0",
            border: "none",
            borderBottom: "5px solid #5DADE2",
          }}
        />
        <div className="col-md-6">
          <label htmlFor="tipo">
            Tipo
            <span style={{ color: "red", marginLeft: "5px", fontSize: "20px" }}>
              *
            </span>
          </label>
          <select
            className="form-select form-select-md mb-3"
            aria-label=".form-select-lg example"
            name="tipo"
            value={modulo.tipo}
            onChange={(e) =>
              setModulo({ ...modulo, tipo: Number(e.target.value) })
            }
            placeholder="Selecciona un tipo"
          >
            <option value="">Seleccionar</option>
            {destructuring.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.descripcion}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="categoria">
            Categoria{" "}
            <span style={{ color: "red", marginLeft: "5px", fontSize: "20px" }}>
              *
            </span>
          </label>
          <select
            className="form-select form-select-md mb-3"
            aria-label=".form-select-lg example"
            name="categoria"
            value={modulo.categoria}
            onChange={(e) =>
              setModulo({ ...modulo, categoria: Number(e.target.value) })
            }
            placeholder="Selecciona una categoria"
          >
            <option value="">Seleccionar</option>
            {primerArreglo.map((mod) => (
              <option key={mod.id} value={mod.id}>
                {mod.descripcion}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="descripcion">
            Descripción{" "}
            <span style={{ color: "red", marginLeft: "5px", fontSize: "20px" }}>
              *
            </span>
          </label>
          <input
            type="text"
            className="form-control"
            name="descripcion"
            value={modulo.descripcion}
            autoComplete="off"
            placeholder="Descripción"
            onChange={(e) =>
              setModulo({ ...modulo, descripcion: e.target.value })
            }
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="valor">
            Valor{" "}
            <span style={{ color: "red", marginLeft: "5px", fontSize: "20px" }}>
              *
            </span>
          </label>
          <input
            type="number"
            className="form-control"
            name="valor"
            value={modulo.valor}
            autoComplete="off"
            placeholder="Valor"
            onChange={(e) =>
              setModulo({ ...modulo, valor: Number(e.target.value) })
            }
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="fechaDesde">
            Fecha Desde{" "}
            <span style={{ color: "red", marginLeft: "5px", fontSize: "20px" }}>
              *
            </span>
          </label>
          <input
            type="datetime-local"
            className="form-control"
            name="fechaDesde"
            value={modulo.fechaDesde}
            autoComplete="off"
            placeholder="Fecha Desde"
            onChange={(e) =>
              setModulo({
                ...modulo,
                fechaDesde: formatDateTime(e.target.value),
              })
            }
          />
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
          <button type="submit" className="btn btn-success pt-2">
            Crear Modulo
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearModulo;