import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOperativos } from "../Redux/Actions";
import DataTable from "react-data-table-component";
import EmptyTable from "./UI/EmptyTable";
import { usePagination } from "../hooks/usePagination";
import Moment from "moment";
import Spinner from "./UI/Spinner";
import MultiFilter from "./UI/MultiFilter";

const GetOperativos = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const operativos = useSelector((state) => state.operativos);
  const [search, setSearch] = useState("");
  const primerArreglo = operativos.slice(0, 1)[0];
  const [operativo, setOperativo] = useState(primerArreglo);

  const { paginationOptions } = usePagination(primerArreglo);

  useEffect(() => {
    dispatch(getOperativos());
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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

  return (
    <div>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <h1>Operativos</h1>
          <h5 className="subtitulo" style={{ color: "#5DADE2" }}>
            Listado de todos los Operativos
          </h5>
          <br />

          <MultiFilter>
            <div class="mb-3">
              <label htmlFor="inputRef" className="fw-bold form-label">
                Proceso de Donación:
              </label>
              <input
                id="inputRef"
                type="text"
                className="form-control"
                placeholder="1234"
                // onChange={handleOnChange}
                // value={search}
                autoComplete="off"
              />
            </div>
            <div class="mb-3">
              <label htmlFor="inputDesc" className="fw-bold form-label">
                Descripción:
              </label>
              <input
                id="inputDesc"
                type="text"
                className="form-control"
                placeholder="Ablación..."
                // onChange={handleOnChange}
                // value={search}
                autoComplete="off"
              />
            </div>
          </MultiFilter>

          <DataTable
            columns={columns}
            data={operativo}
            pagination
            striped
            paginationComponentOptions={paginationOptions}
            noDataComponent={<EmptyTable msg="No se encontro el operativo" />}
          />
        </>
      )}
    </div>
  );
};

export default GetOperativos;
