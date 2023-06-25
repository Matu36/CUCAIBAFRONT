import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAgentes } from "../Redux/Actions";
import Paginacion from "./Paginacion";
import ClipLoader from "react-spinners/ClipLoader";

const GetAgentes = () => {

  const dispatch = useDispatch();
  const agentes = useSelector((state) => state.agentes);
  const [search, setSearch] = useState("");
  const [agente, setAgente] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPage, setNumberOfPage] = useState(0);
  const [totalAgentes, setTotalAgentes] = useState([]);

  const primerArreglo = agentes.slice(0, 1)[0];

  useEffect(() => {
    dispatch(getAgentes());
  }, [dispatch]);

  useEffect(() => {
    setAgente(primerArreglo || []);
  }, [primerArreglo]);


  //-------------------------------- SEARCHBAR --------------------------- //

  useEffect(() => {
    filterByCuil(search);
  }, [agente, search]);

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
    setTotalAgentes(
      agente.slice(indexFirstPageIngredient(), indexLastPageIngredient())
    );
    setNumberOfPage(Math.ceil(agente.length / 9));
  }, [agente, currentPage]);

  const indexFirstPageIngredient = () => (currentPage - 1) * 9;
  const indexLastPageIngredient = () => indexFirstPageIngredient() + 9;

  const handlePageNumber = (number) => {
    setCurrentPage(number);
  };

  //--------------------------------- FIN PAGINADO-------------------------------- //
  if (agentes.length === 0) {
    return (
      <div className="spinner-container">
        <ClipLoader
          color={"#0000555"}
          loading={true}
          size={85}
        />
      </div>
    );
  }

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
            {totalAgentes.map((agente) => (
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
          numberOfPage={numberOfPage}
          handlePageNumber={handlePageNumber}
        />
      )}
    </div>
  );
};

export default GetAgentes;
