import React, { useState, useEffect } from "react";
import "./styles/tablaHonorarios.css";
import { BsFillPersonFill } from "react-icons/bs";
import "../lib/tooltip";
import { usePagination } from "../hooks/usePagination";
import EmptyTable from "../components/UI/EmptyTable";
import DataTable from "react-data-table-component";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import {
  getOperativos,
  getAgentes,
} from "../Redux/Actions";
import { FormHonorario } from "../components/FormHonorario";

const ExpandedComponent = () => {

  //Renderizando los agentes //
  const agentes = useSelector((state) => state.agentes);
  let dispatch = useDispatch();
  const primerArreglo = agentes.slice(0, 1)[0];
  const [agente, setAgente] = useState(primerArreglo);

  useEffect(() => {
    dispatch(getAgentes());
  }, []);

  useEffect(() => {
    setAgente(primerArreglo);
  }, []);

  //MOSTRANDO EL FORMULARIO DE CREACION //
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  function handleMostrarFormulario() {
    setMostrarFormulario(true);
  }

  function handleCerrarFormulario() {
    setMostrarFormulario(false);
  }

  //FIN FORMULARIO DE CREACION//
  
  return (
    <div className="p-3">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5>Agentes asociados al Operativo</h5>
          <hr />
        </div>

        <button
          type="button"
          className="btn btn-success"
          onClick={handleMostrarFormulario}
        >
          Agregar Agente <BsFillPersonFill />
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
            <div
              className="form-container pt-2"
              style={{
                padding: "20px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                border: "1px solid gray",
              }}
            >
              <FormHonorario handleCerrarFormulario={handleCerrarFormulario} />
            </div>
          </div>
        )}
      </div>

      <table className="table table-responsive">
        <thead>
          <tr>
            <th scope="col">CUIL</th>
            <th scope="col">DNI</th>
            <th scope="col">Nombre</th>
            <th scope="col">CBU</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

const columns = [
  { name: "Referencia", selector: (row) => row.referencia, sortable: true },
  {
    name: "Fecha",
    selector: (row) => row.fecha,
    sortable: true,
    format: (row) => moment(row.fecha).format("L"),
  },
  { name: "Descripción", selector: (row) => row.descripcion, sortable: true },
];

const TablaHonorarios = ({ ...props }) => {
  const dispatch = useDispatch();
  const operativos = useSelector((state) => state.operativos);
  const primerArreglo = operativos.slice(0, 1)[0];
  const [search, setSearch] = useState("");
  const [honorario, setHonorario] = useState(primerArreglo);
  const { paginationOptions } = usePagination(primerArreglo);

  useEffect(() => {
    dispatch(getOperativos());
  }, []);

  useEffect(() => {
    setHonorario(primerArreglo);
  }, [primerArreglo]);

  const [showSpinner, setShowSpinner] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(false);
    }, 2000);
  }, []);

  //-------------------------------- SEARCHBAR --------------------------- //

  useEffect(() => {
    filterByReferencia(search);
  }, [search]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByReferencia = (value) => {
    if (!value) {
      setHonorario(primerArreglo);
    } else {
      const arrayCache = primerArreglo.filter((oper) =>
        oper.referencia.toLowerCase().includes(value.toLowerCase())
      );
      setHonorario(arrayCache);
    }
  };

  //-------------------------------- FIN SEARCHBAR --------------------------- //

  if (operativos.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        {showSpinner ? (
          <div
            className="spinner-border spinner-border-lg text-primary"
            style={{ width: "5rem", height: "5rem" }}
            role="status"
          ></div>
        ) : (
          "null"
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <h1>Honorarios</h1>
        <h5 className="subtitulo" style={{ color: "#5DADE2" }}>
          Carga de Honorarios Variables
        </h5>
        <hr />
        <div className="input-group mb-3" style={{ maxWidth: "40%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por Referencia"
            onChange={handleOnChange}
            value={search}
            autoComplete="off"
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={honorario}
        pagination
        striped
        paginationComponentOptions={paginationOptions}
        noDataComponent={
          <EmptyTable msg="No se encontro el Agente con ese CUIL" />
        }
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        {...props}
      />
    </div>
  );
};

export default TablaHonorarios;
