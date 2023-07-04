import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getCategorias, getTipoModulo, postModulo } from "../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";

const CrearModulo = () => {
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
    Tipo: "",
    Categoria: "",
    Valor: "",
    Descripcion: "",
    FechaDesde: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (
      modulo.Tipo &&
      modulo.Categoria &&
      modulo.Valor &&
      modulo.Descripcion &&
      modulo.FechaDesde
    ) {
      const newModulo = {
        ...modulo,
      };
      dispatch(postModulo(newModulo));

      console.log(newModulo);
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "El modulo ha sido creado",
        showConfirmButton: false,
        timer: 4000,
      });

      setModulo({
        Tipo: "",
        Categoria: "",
        Valor: "",
        Descripcion: "",
        FechaDesde: "",
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
      className="form-container"
      style={{
        padding: "20px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        border: "2px solid black",
      }}
    >
      <form onSubmit={handleOnSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="tipo">Tipo</label>
          <select
            name="tipo"
            value={modulo.destructuring}
            onChange={(e) =>
              setModulo({ ...modulo, Tipo: Number(e.target.value) })
            }
            placeholder="Selecciona un tipo"
          >
            {destructuring.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.descripcion}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="categoria">Categoria</label>
          <select
            name="categoria"
            value={modulo.primerArreglo}
            onChange={(e) =>
              setModulo({ ...modulo, Categoria: Number(e.target.value) })
            }
            placeholder="Selecciona una categoria"
          >
            {primerArreglo.map((mod) => (
              <option key={mod.id} value={mod.id}>
                {mod.descripcion}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="descripcion">Descripcion</label>
          <input
            type="text"
            className="form-control"
            name="descripcion"
            value={modulo.Descripcion}
            autoComplete="off"
            placeholder="Descripción"
            onChange={(e) =>
              setModulo({ ...modulo, Descripcion: e.target.value })
            }
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="valor">Valor</label>
          <input
            type="number"
            className="form-control"
            name="valor"
            value={modulo.Valor}
            autoComplete="off"
            placeholder="Valor"
            onChange={(e) =>
              setModulo({ ...modulo, Valor: Number(e.target.value) })
            }
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="fechaDesde">Fecha Desde</label>
          <input
            type="datetime-local"
            className="form-control"
            name="fechaDesde"
            value={modulo.FechaDesde}
            autoComplete="off"
            placeholder="Fecha Desde"
            onChange={(e) =>
              setModulo({
                ...modulo,
                FechaDesde: formatDateTime(e.target.value),
              })
            }
          />
        </div>
        <div className="col-8 d-flex justify-content-center pt-4">
          <button type="submit" className="btn btn-primary">
            Crear Modulo
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearModulo;
