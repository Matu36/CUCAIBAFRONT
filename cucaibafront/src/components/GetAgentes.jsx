import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAgentes } from "../Redux/Actions";
import Paginacion from "./Paginacion";

const GetAgentes = () => {
  const dispatch = useDispatch();
  const agentes = useSelector((state) => state.agentes);
  const [search, setSearch] = useState("");
  const [agente, setAgente] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const primerArreglo = agentes.slice(0, 1)[0];

  useEffect(() => {
    dispatch(getAgentes(currentPage, 10));
  }, [dispatch, currentPage]);

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
    let arrayCache = [...agente];
    if (!search) {
      setAgente(primerArreglo || []); // Restablecer al valor original si la búsqueda está vacía
    } else {
      arrayCache = arrayCache.filter((oper) =>
        oper.cuil.toLowerCase().includes(value.toLowerCase())
      );
      setAgente(arrayCache);
    }
  };

  //-------------------------------- FIN SEARCHBAR --------------------------- //

  //--------------------------------- PAGINADO-------------------------------- //

  useEffect(() => {
    setTotalPages(Math.ceil(agentes.length));
  }, [agentes]);

  const handlePageNumber = (number) => {
    setCurrentPage(number);
  };



  //--------------------------------- FIN PAGINADO-------------------------------- //

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

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>CBU</th>
              <th>CUIL</th>
            </tr>
          </thead>
          <tbody>
            {agente.map((agente) => (
              <tr key={agente.id}>
                <td>{agente.id}</td>
                <td>{agente.apellido}</td>
                <td>{agente.nombre}</td>
                <td>{agente.cbu}</td>
                <td>{agente.cuil}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {agentes && (
        <Paginacion
          currentPage={currentPage}
          numberOfPage={totalPages}
          handlePageNumber={handlePageNumber}
        />
      )}
    </div>
  );
};

export default GetAgentes;