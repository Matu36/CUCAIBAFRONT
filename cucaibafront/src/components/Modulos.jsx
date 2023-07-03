import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getModulos } from "../Redux/Actions";
import DataTable from "react-data-table-component";
import EmptyTable from "./UI/EmptyTable";
import { usePagination } from "../hooks/usePagination";
import { CgCloseO } from "react-icons/cg";
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

  //----------------------------------PAGINADO ------------------------------//

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Descripción", selector: (row) => row.descripcion, sortable: true },
    { name: "Valor", selector: (row) => row.valor, sortable: true },
    {
      name: "Fecha Desde",
      selector: (row) => row.fechaDesde,
      sortable: true,
      format: (row) => Moment(row.fecha).format("L"),
    },
    { name: "Fecha hasta", selector: (row) => row.fecha_hasta, sortable: true },
  ];

  //------------------------- FIN PAGINADO -----------------------------------//

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
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm mr-2"
              role="status"
              aria-hidden="true"
            ></span>
            Cargando...
          </button>
        ) : null}
      </div>
    );
  }

  //---------------------------------FIN SPINNER ------------------------------------//

  return (
    <div>
      <h1>Lista de Módulos</h1>
      <br />
<div style={{display:"flex", justifyContent:"space-between"}}>
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
       className="btn btn-primary"
       style={{ background: "var(--ms-main-color)" }}
        onClick={handleMostrarFormulario}
      >
        Crear Módulo
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
          <button fontSize="2rem" onClick={handleCerrarFormulario}>
            <CgCloseO />
          </button>
          <CrearModulo />
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
