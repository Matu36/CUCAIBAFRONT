import React, { useState, useEffect } from "react";
import "./styles/tablaHonorarios.css";
import "../lib/tooltip";
import { usePagination } from "../hooks/usePagination";
import EmptyTable from "../components/UI/EmptyTable";
import DataTable from "react-data-table-component";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getOperativos, getHonorario } from "../Redux/Actions";
import { FormHonorario } from "../components/FormHonorario";
import { useHonorarios } from "../hooks/useHonorarios";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../components/UI/Modal";

const ExpandedComponent = ({ data: operativo }) => {
  const { data, isLoading } = useHonorarios(operativo.id).honorariosQuery;
  return (
    <>
      <Modal title="Hola Mundo">
        <FormHonorario />
      </Modal>
      <div>
        <div className="p-3">
          <div className="agentes-container">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h5>Agentes asociados al Operativo</h5>
                <hr />
              </div>
            </div>
            <div className="p-3">
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th scope="col">Apellido</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">CUIL</th>
                    <th scope="col">Acción</th>
                  </tr>
                </thead>
                {isLoading && (
                  <tbody>
                    <tr>
                      <td colSpan={4}>Cargando...</td>
                    </tr>
                  </tbody>
                )}
                {!isLoading && typeof data === "object" ? (
                  <tbody>
                    {data.map((agente) => (
                      <tr key={agente.persona_id}>
                        <td>{agente.apellido}</td>
                        <td>{agente.nombre}</td>
                        <td>{agente.cuil}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target="#formModal"
                          >
                            <AiOutlinePlus /> Agregar Función
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={4}>
                        No hay ningún Agente Asociado al Operativo
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TablaHonorarios = () => {
  const dispatch = useDispatch();
  const operativos = useSelector((state) => state.operativos);
  const primerArregloOper = operativos.slice(0, 1)[0];
  const [search, setSearch] = useState("");
  const [honorario, setHonorario] = useState(primerArregloOper);
  const { paginationOptions } = usePagination(primerArregloOper);

  //Renderizado de los operativos //

  useEffect(() => {
    dispatch(getOperativos());
  }, []);

  useEffect(() => {
    setHonorario(primerArregloOper);
  }, [primerArregloOper]);

  const [showSpinner, setShowSpinner] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(false);
    }, 2000);
  }, []);

  //Renderizando los honorarios //
  const honorarios = useSelector((state) => state.honorario);
  const primerArreglo = honorarios.slice(0, 1)[0];
  const [honorar, setHonorar] = useState(primerArreglo);

  useEffect(() => {
    dispatch(getHonorario());
  }, []);

  useEffect(() => {
    setHonorar(primerArreglo);
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
      setHonorario(primerArregloOper);
    } else {
      const arrayCache = primerArregloOper.filter((oper) =>
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

  const columns = [
    {
      name: "Proceso de Donación",
      selector: (row) => row.referencia,
      sortable: true,
    },
    {
      name: "Fecha del Operativo",
      selector: (row) => row.fecha,
      sortable: true,
      format: (row) => moment(row.fecha).format("L"),
    },
    {
      name: "Descripción del Operativo",
      selector: (row) => row.descripcion,
      sortable: true,
    },
  ];

  return (
    <>
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
            <EmptyTable msg="No se encontró el PD con ese número de Referencia" />
          }
          expandableRows
          expandableRowsComponent={ExpandedComponent}
        />
      </div>
    </>
  );
};

export default TablaHonorarios;
