import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAgentes } from "../Redux/Actions";
import Paginacion from "./Paginacion";
import { useAgentes } from "../hooks/useAgentes";

const GetAgentes = () => {
  const { agentesQuery } = useAgentes();
  // console.log(agentesQuery.data);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAgentes());
  }, []);

  const agentes = useSelector((state) => state.agentes);

  //SEARCHBAR

  const [search, setSearch] = useState("");
  const [agente, setAgente] = useState(agentes);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByLastName = (value) => {
    let arrayCache = [...agentes];
    if (!search) setAgente(agentes);
    else {
      arrayCache = arrayCache.filter((agent) =>
        agent.cuil.toLowerCase().includes(value.toLowerCase())
      );

      setAgente(arrayCache);
    }
  };

  useEffect(() => {
    filterByLastName(search);
  }, [agentes, search]);
  //FIN SEARCHBAR

  //PAGINADO

  const [currentPage, setCurrentPage] = useState(1); //Pagina Actual seteada en 1
  const [numberOfPage, setNumberOfPage] = useState(0); //Numero de Paginas seteado en 0
  const [totalAgentes, setTotalAgentes] = useState(agente);

  const indexFirstPageIngredient = () => (currentPage - 1) * 9; // Indice del primer Elemento
  const indexLastPageIngredient = () => indexFirstPageIngredient() + 9; //Indice del segundo elemento

  const handlePageNumber = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    setTotalAgentes(
      agente.slice(indexFirstPageIngredient(), indexLastPageIngredient())
    );
    setNumberOfPage(Math.ceil(agente.length / 9)); // cambiando el estado local de numeros de paginas a renderiza
  }, [agente, currentPage]);

  //FIN PAGINADO

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
