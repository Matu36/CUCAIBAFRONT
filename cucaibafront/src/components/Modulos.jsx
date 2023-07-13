import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getModulos, updateModulo } from "../Redux/Actions";
import DataTable from "react-data-table-component";
import EmptyTable from "./UI/EmptyTable";
import { usePagination } from "../hooks/usePagination";
import Moment from "moment";
import CrearModulo from "./CrearModulo";

const Modulos = ({ ...props }) => {
  const dispatch = useDispatch();
  const modulos = useSelector((state) => state.modulos);
  const [search, setSearch] = useState("");
  let primerArreglo = [];
  if (modulos.length > 1) {
    primerArreglo = modulos[1][0];
  }
  const [modulo, setModulo] = useState(primerArreglo);

  const { paginationOptions } = usePagination(primerArreglo);

  useEffect(() => {
    dispatch(getModulos());
  }, []);

  useEffect(() => {
    setModulo(primerArreglo);
  }, [primerArreglo]);

  //-------------------------------- SEARCHBAR --------------------------- //

  useEffect(() => {
    filterByDescripcion(search);
  }, [search]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByDescripcion = (value) => {
    if (!value) {
      setModulo(primerArreglo);
    } else {
      const arrayCache = primerArreglo.filter((mod) =>
        mod.descripcion.toLowerCase().includes(value.toLowerCase())
      );
      setModulo(arrayCache);
    }
  };

  //MOSTRANDO EL FORMULARIO DE CREACION //

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  function handleMostrarFormulario() {
    setMostrarFormulario(true);
  }

  function handleCerrarFormulario() {
    setMostrarFormulario(false);
  }

  //-------------------------------- FIN SEARCHBAR --------------------------- //

  //EDITAR PRECIO

  const [editIndex, setEditIndex] = useState(null);
  const [editPrice, setEditPrice] = useState(null);

  const handleEdit = (id, valor) => {
    setEditIndex(id);
    setEditPrice(valor);
  };

  const handlePriceChange = (valor) => {
    setEditPrice(valor);
  };

  const handleSave = (id) => {
    if (editPrice !== null) {
      const updatedModulo = {
        id: id,
        valor: editPrice,
      };

      dispatch(updateModulo(updatedModulo));
      dispatch(getModulos());
      setEditIndex(null);
      setEditPrice(null);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditPrice(null);
  };

  //FIN EDITAR PRECIO

  //----------------------------------COLUMNAS ------------------------------//

  const columns = [
    { name: "Descripción", selector: (row) => row.descripcion, sortable: true },
    { name: "Valor", selector: (row) => row.valor, sortable: true },
    {
      name: "Fecha Desde",
      selector: (row) => row.fechaDesde,
      sortable: true,
      format: (row) => Moment(row.fechaDesde).format("L"),
    },
    {
      name: "Fecha hasta",
      selector: (row) => row.fechaHasta,
      format: (row) =>
        row.fechaHasta ? Moment(row.fechaHasta).format("L") : "",

      sortable: true,
    },
    {
      name: "Acción",
      cell: (row) =>
        editIndex === row.id ? (
          <>
            <input
              className="input"
              style={{ maxWidth: "40%" }}
              type="number"
              value={editPrice}
              onChange={(e) => handlePriceChange(+e.target.value)}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                maxWidth: "50%",
                marginLeft: "1rem",
              }}
            >
              <button
                className="btn btn-outline-secondary btn-sm mt-1"
                onClick={() => handleSave(row.id)}
              >
                Guardar
              </button>
              <button
                className="btn btn-secondary btn-sm mb-1"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <button
            className="btn btn-success btn-sm"
            onClick={() => handleEdit(row.id, row.valor)}
          >
            {" "}
            Editar Valor
          </button>
        ),
    },
  ];

  //---------------------------------SPINNER ------------------------------------//

  const [showSpinner, setShowSpinner] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(false);
    }, 2000);
  }, []);
  if (modulos.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        {showSpinner ? (
          <div
            className="spinner-border spinner-border-lg text-primary"
            style={{ width: "5rem", height: "5rem" }}
            role="status"
          >
          </div>
        ) : null}
      </div>
    );
  }

  //---------------------------------FIN SPINNER ------------------------------------//

  return (
    <div>
      <h1>Módulos</h1>
      <h5 className="subtitulo" style={{ color: "#5DADE2" }}>
        Listado de todos los módulos
      </h5>
      <br />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="input-group mb-3" style={{ maxWidth: "40%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por Descripción"
            onChange={handleOnChange}
            value={search}
            autoComplete="off"
          />
        </div>
        <button
          className="btn btn-success btn-md"
          style={{ marginRight: "4rem", marginBottom: "2rem" }}
          onClick={handleMostrarFormulario}
        >
          + Crear Módulo
        </button>

        {mostrarFormulario && (
          <div
            style={{
              position: "fixed",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              zIndex: "999",
            }}
          >
            <CrearModulo handleCerrarFormulario={handleCerrarFormulario} />
          </div>
        )}
      </div>

      <DataTable
        columns={columns}
        data={modulo}
        pagination
        striped
        paginationComponentOptions={paginationOptions}
        noDataComponent={<EmptyTable msg="No se encontro el tipo de Módulo" />}
        {...props}
      />
    </div>
  );
};

export default Modulos;