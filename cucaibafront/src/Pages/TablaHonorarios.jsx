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
  getModulos,
  getHonorario,
  postHonorario,
} from "../Redux/Actions";
import Swal from "sweetalert2";

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

  //Renderizando los módulos

  const modulos = useSelector((state) => state.modulos);

  let arregloModulos = [];

  if (modulos.length > 1) {
    arregloModulos = modulos[1][0];
  }
  const [modulo, setModulo] = useState(arregloModulos);

  useEffect(() => {
    dispatch(getModulos());
  }, []);

  useEffect(() => {
    setModulo(arregloModulos);
  }, []);

  //CREACION DE HONORARIO //
  const [honorario, setHonorario] = useState({
    operativo_id: "",
    agente_id: "",
    modulo_id: "",
    fechaModif: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (
      honorario.operativo_id &&
      honorario.agente_id &&
      honorario.modulo_id &&
      honorario.fechaModif
    ) {
      const newHonorario = {
        ...honorario,
      };

      
      dispatch(postHonorario(newHonorario));
      
      console.log(newHonorario);
      //  ALERT //
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "El honorario se ha asignado correctamente al Agente",
        showConfirmButton: false,
        timer: 3000,
      });
      window.location.reload();

      setHonorario({
        operativo_id: "",
        agente_id: "",
        modulo_id: "",
        fechaModif: "",
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Por favor, completa todos los campos",
        showConfirmButton: true,
      });

      // FIN ALTERT //
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

  //FIN FORMULARIO DE CREACION//
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const [nombreOpcionSeleccionada, setNombreOpcionSeleccionada] = useState("");

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
              <form onSubmit={handleOnSubmit} className="row g-3 pt-4">
                <div
                  className="honorario"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginLeft: 0,
                    color: "#5DADE2",
                  }}
                >
                  <h6>CREAR HONORARIO</h6>
                </div>
                <hr
                  style={{
                    margin: "10px 0",
                    border: "none",
                    borderBottom: "5px solid #5DADE2",
                  }}
                />
                <label className="NroPD"> Proceso de Donación Número </label>

                <input
  type="hidden"
  value={honorario.operativo_id}
  name="operativo_id"
/>

                <div className="col-md-6">
                  <label htmlFor="tipo">
                    Seleccionar Agente
                    <span
                      style={{
                        color: "red",
                        marginLeft: "5px",
                        fontSize: "20px",
                      }}
                    >
                      *
                    </span>
                  </label>
                  <select
                    className="form-select form-select-md mb-3"
                    aria-label=".form-select-lg example"
                    name="agente_id"
                    value={honorario.agente_id}
                    onChange={(e) =>
                      setHonorario({
                        ...honorario,
                        agente_id: Number(e.target.value),
                      })
                    }
                    placeholder="Selecciona un tipo"
                  >
                    <option value="">Seleccionar</option>
                    {primerArreglo.map((agente) => (
                      <option key={agente.id} value={agente.id}>
                        {agente.apellido + ", " + agente.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="tipo">
                    Función desempeñada
                    <span
                      style={{
                        color: "red",
                        marginLeft: "5px",
                        fontSize: "20px",
                      }}
                    >
                      *
                    </span>
                  </label>
                  <select
                    className="form-select form-select-md mb-3"
                    aria-label=".form-select-lg example"
                    name="modulo_id"
                    value={opcionSeleccionada}
                    onChange={(e) => {
                      setHonorario({
                        ...honorario,
                        modulo_id: Number(e.target.value),
                      });
                      setOpcionSeleccionada(e.target.value);
                      setNombreOpcionSeleccionada(
                        e.target.options[e.target.selectedIndex].text
                      );
                    }}
                    placeholder="Selecciona un tipo"
                  >
                    <option value="">Seleccionar</option>
                    {arregloModulos.map((modulo) => (
                      <option key={modulo.id} value={modulo.id}>
                        {modulo.descripcion}
                      </option>
                    ))}
                  </select>
            
                  {opcionSeleccionada && (
                    <div className="pt-4">
                      <p>{nombreOpcionSeleccionada}</p>
                      <p style={{fontWeight:"bold"}}>
                        Valor: {arregloModulos[opcionSeleccionada - 1]?.valor}
                      </p>
                    </div>
                  )}
                </div>

                <input
  type="hidden"
  value={honorario.fechaModif}
  name="fechaModif"
/>
                <hr
                  style={{
                    marginTop: "3rem",
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
                    Crear Honorario
                  </button>
                </div>
              </form>
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
