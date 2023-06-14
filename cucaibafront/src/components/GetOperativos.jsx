import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOperativos } from "../Redux/Actions";
import Paginacion from "./Paginacion";

const GetOperativos = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOperativos());
  }, []);

  const operativos = useSelector((state) => state.operativos);

  //SEARCHBAR

  const [search, setSearch] = useState("");
  const [operativo, setOperativo] = useState(operativos);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByLastName = (value) => {
    let arrayCache = [...operativos];
    if (!search) setOperativo(operativos);
    else {
      arrayCache = arrayCache.filter((oper) =>
        oper.referencia.toLowerCase().includes(value.toLowerCase())
      );

      setOperativo(arrayCache);
    }
  };

  useEffect(() => {
    filterByLastName(search);
  }, [operativos, search]);
  //FIN SEARCHBAR

  //PAGINADO

  const [currentPage, setCurrentPage] = useState(1); //Pagina Actual seteada en 1
  const [numberOfPage, setNumberOfPage] = useState(0); //Numero de Paginas seteado en 0
  const [totalOperativos, setTotalOperativos] = useState(operativo);

  const indexFirstPageIngredient = () => (currentPage - 1) * 9; // Indice del primer Elemento
  const indexLastPageIngredient = () => indexFirstPageIngredient() + 9; //Indice del segundo elemento

  const handlePageNumber = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    setTotalOperativos(
      operativo.slice(indexFirstPageIngredient(), indexLastPageIngredient())
    );
    setNumberOfPage(Math.ceil(operativo.length / 9)); // cambiando el estado local de numeros de paginas a renderiza
  }, [operativo, currentPage]);

  //FIN PAGINADO

  return (
    <div>
      <h1>Lista de Operativos</h1>
      <br />

      <div className="input-group mb-3" style={{ width: "30rem" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar número de Referencia"
          onChange={handleOnChange}
          value={search}
          autoComplete="off"
        />
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Referencia</th>
            <th>Fecha</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          {totalOperativos.map((operativo) => (
            <tr key={operativo.id}>
              <td>{operativo.referencia}</td>
              <td>{operativo.fecha.date}</td>
              <td>{operativo.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {operativos && (
        <Paginacion
          currentPage={currentPage}
          numberOfPage={numberOfPage}
          handlePageNumber={handlePageNumber}
        />
      )}
    </div>
  );
};

export default GetOperativos;
