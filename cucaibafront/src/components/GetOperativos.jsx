import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOperativos } from "../Redux/Actions";
import DataTable from "react-data-table-component";
import EmptyTable from "./UI/EmptyTable";
import { usePagination } from "../hooks/usePagination";
import Moment from "moment";

const GetOperativos = () => {
  const dispatch = useDispatch();
  const operativos = useSelector((state) => state.operativos);
  const [search, setSearch] = useState("");
  const primerArreglo = operativos.slice(0, 1)[0];
  const [operativo, setOperativo] = useState(primerArreglo);

  const { paginationOptions } = usePagination(primerArreglo);

  useEffect(() => {
    dispatch(getOperativos());
  }, []);

  useEffect(() => {
    setOperativo(primerArreglo);
  }, [primerArreglo]);

  //-------------------------------- SEARCHBAR --------------------------- //

  useEffect(() => {
    filterByRef(search);
  }, [search]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const filterByRef = (value) => {
    if (!value) {
      setOperativo(primerArreglo);
    } else {
      const arrayCache = primerArreglo.filter((oper) =>
        oper.referencia.toLowerCase().includes(value.toLowerCase())
      );
      setOperativo(arrayCache);
    }
  };

  //-------------------------------- FIN SEARCHBAR --------------------------- //

  //--------------------------------- PAGINADO-------------------------------- //
  const columns = [
    {
      name: "Proceso de Donación",
      selector: (row) => row.referencia,
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => row.fecha,
      sortable: true,
      format: (row) => Moment(row.fecha).format("L"),
    },
    { name: "Descripción", selector: (row) => row.descripcion, sortable: true },
  ];

  //--------------------------------- FIN PAGINADO-------------------------------- //

  //---------------------------------SPINNER ------------------------------------- //
  const [showSpinner, setShowSpinner] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(false);
    }, 2000);
  }, []);
  if (operativos.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        {showSpinner ? (
          <div
            className="spinner-border spinner-border-lg text-primary"
            style={{ width: "5rem", height: "5rem" }}
            role="status"
          >
            <span className="visually-hidden">Cargando...</span>
          </div>
        ) : null}
      </div>
    );
  }

  //------------------------------------FIN SPINNER ------------------------------ //

  return (
    <div>
      <h1>Operativos</h1>
      <h5 className="subtitulo" style={{ color: "#5DADE2" }}>
        Listado de todos los Operativos
      </h5>
      <br />

      <div className="input-group mb-3" style={{ maxWidth: "40%" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por Número de Referencia"
          onChange={handleOnChange}
          value={search}
          autoComplete="off"
        />
      </div>

      <DataTable
        columns={columns}
        data={operativo}
        pagination
        striped
        paginationComponentOptions={paginationOptions}
        noDataComponent={
          <EmptyTable msg="No se encontro el operativo con ese N° SINTRA" />
        }
      />
    </div>
  );
};

export default GetOperativos;
