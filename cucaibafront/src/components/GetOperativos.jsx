import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOperativos } from "../Redux/Actions";
import Paginacion from "./Paginacion";
import ClipLoader from "react-spinners/ClipLoader";

const GetOperativos = () => {
  const dispatch = useDispatch();
  const operativos = useSelector((state) => state.operativos);
  const [search, setSearch] = useState("");
  const [operativo, setOperativo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPage, setNumberOfPage] = useState(0);
  const [totalOperativos, setTotalOperativos] = useState([]);

  const primerArreglo = operativos.slice(0, 1)[0];

  useEffect(() => {
    dispatch(getOperativos());
  }, [dispatch]);

  useEffect(() => {
    setOperativo(primerArreglo || []);
  }, [primerArreglo]);

  //-------------------------------- SEARCHBAR --------------------------- //

  useEffect(() => {
    filterByRef(search);
  }, [operativo, search]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const filterByRef = (value) => {
    let arrayCache = [...operativo];
    if (!search) {
      setOperativo(primerArreglo || []); // Restablecer al valor original si la búsqueda está vacía
    } else {
      arrayCache = arrayCache.filter((oper) =>
        oper.referencia.toLowerCase().includes(value.toLowerCase())
      );
      setOperativo(arrayCache);
    }
  };

  //-------------------------------- FIN SEARCHBAR --------------------------- //

  //--------------------------------- PAGINADO-------------------------------- //
  useEffect(() => {
    setTotalOperativos(
      operativo.slice(indexFirstPageIngredient(), indexLastPageIngredient())
    );
    setNumberOfPage(Math.ceil(operativo.length / 9));
  }, [operativo, currentPage]);

  const indexFirstPageIngredient = () => (currentPage - 1) * 9;
  const indexLastPageIngredient = () => indexFirstPageIngredient() + 9;

  const handlePageNumber = (number) => {
    setCurrentPage(number);
  };

  //--------------------------------- FIN PAGINADO-------------------------------- //
  if (operativos.length === 0) {
    return (
      <button class="btn btn-primary" type="button" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>
    );
  }

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
              <td>{operativo.fecha}</td>
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
