import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAgentes } from "../Redux/Actions";

const GetAgentes = () => {
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
        agent.apellido.toLowerCase().includes(value.toLowerCase())
      );

      setAgente(arrayCache);
    }
  };

  useEffect(() => {
    filterByLastName(search);
  }, [agentes, search]);
                              //FIN SEARCHBAR

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Buscar Usuario "
          onChange={handleOnChange}
          value={search}
          autoComplete="off"
          width="30rem"
        />
      </div>
      <h1>Lista de Agentes</h1>
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
  );
};

export default GetAgentes;
