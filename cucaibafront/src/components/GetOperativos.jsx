import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOperativos } from "../Redux/Actions";
import DataTable from "react-data-table-component";
import EmptyTable from "./UI/EmptyTable";

const GetOperativos = () => {
  const dispatch = useDispatch();
  const operativos = useSelector((state) => state.operativos);
  const [search, setSearch] = useState("");
  const primerArreglo = operativos.slice(0, 1)[0];
  const [operativo, setOperativo] = useState(primerArreglo);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

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
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = (perPage, page) => {
    setCurrentPage(page);
    setPerPage(perPage);
  };

  const paginationOptions = {
    paginationServer: false,
    paginationTotalRows: primerArreglo ? primerArreglo.length : 0,
    paginationDefaultPage: currentPage,
    paginationPerPage: perPage,
    paginationRowsPerPageOptions: [10, 25, 50, 100],
    onChangePage: handlePageChange,
    onChangeRowsPerPage: handlePerRowsChange,
  };

  const columns = [
    { name: "ID", selector: row => row.id, sortable: true },
    { name: "Referencia", selector: row => row.referencia, sortable: true },
    { name: "Fecha", selector: row => row.fecha, sortable: true },
    { name: "Descripción", selector: row => row.descripcion, sortable: true },
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

  //------------------------------------FIN SPINNER ------------------------------ //

  return (
    <div>
      <h1>Lista de Operativos</h1>
      <br />

      <div className="input-group mb-3" style={{ width: "30rem" }}>
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
        noDataComponent={<EmptyTable msg="No se encontro el operativo con ese N° SINTRA" />}
      />
    </div>
  );
};

export default GetOperativos;
