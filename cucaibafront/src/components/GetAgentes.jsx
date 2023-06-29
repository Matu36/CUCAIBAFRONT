import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAgentes } from "../Redux/Actions";
import DataTable from "react-data-table-component";

const GetAgentes = () => {
  const dispatch = useDispatch();
  const agentes = useSelector((state) => state.agentes);
  const [search, setSearch] = useState("");
  const primerArreglo = agentes.slice(0, 1)[0];
  const [agente, setAgente] = useState(primerArreglo);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    dispatch(getAgentes());
  }, []);

  useEffect(() => {
    setAgente(primerArreglo);
  }, [primerArreglo]);

  //-------------------------------- SEARCHBAR --------------------------- //

  useEffect(() => {
    filterByCuil(search);
  }, [search]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByCuil = (value) => {
    if (!value) {
      setAgente(primerArreglo);
    } else {
      const arrayCache = primerArreglo.filter((oper) =>
        oper.cuil.toLowerCase().includes(value.toLowerCase())
      );
      setAgente(arrayCache);
    }
  };

  //-------------------------------- FIN SEARCHBAR --------------------------- //

  //----------------------------------PAGINADO ------------------------------//

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
    { name: "ID", selector: "id", sortable: true },
    { name: "Apellido", selector: "apellido", sortable: true },
    { name: "Nombre", selector: "nombre", sortable: true },
    { name: "CBU", selector: "cbu", sortable: true },
    { name: "CUIL", selector: "cuil", sortable: true },
  ];

  //------------------------- FIN PAGINADO -----------------------------------//

  //---------------------------------SPINNER ------------------------------------//

  const [showSpinner, setShowSpinner] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(false);
    }, 2000);
  }, []);
  if (agentes.length === 0) {
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
      <h1>Lista de Agentes</h1>
      <br />

      <div className="input-group mb-3" style={{ width: "30rem" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por CUIL"
          onChange={handleOnChange}
          value={search}
          autoComplete="off"
        />
      </div>

      <DataTable
        columns={columns}
        data={agente}
        pagination
        paginationComponentOptions={paginationOptions}
      />
    </div>
  );
};

export default GetAgentes;
