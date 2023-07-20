import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOperativos } from "../Redux/Actions";
import DataTable from "react-data-table-component";
import EmptyTable from "./UI/EmptyTable";
import { usePagination } from "../hooks/usePagination";
import Spinner from "./UI/Spinner";
import MultiFilter from "./UI/MultiFilter";
import { obtenerMesYAño } from "../utils/MesAño";
import "../assets/styles/detalle.css";

const GetOperativos = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const operativos = useSelector((state) => state.operativos);
  const [search, setSearch] = useState({
    ref: "",
    descripcion: "",
  });
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

  // useEffect(() => {
  //   filter(name);
  // }, [search]);

  const handleOnChange = (e) => {
    let filteredArray = [];

    setSearch({ ...search, [e.target.name]: e.target.value });

    switch (e.target.name) {
      case "ref":
        filteredArray = primerArreglo.filter((o) =>
          o.referencia.includes(search.ref.toLowerCase())
        );
        if (filteredArray.length > 0) {
          setOperativo(filteredArray);
        } else {
          setOperativo(primerArreglo);
        }
        break;

      case "descripcion":
        filteredArray = primerArreglo.filter((o) =>
          o.descripcion.toLowerCase().includes(search.descripcion.toLowerCase())
        );
        if (filteredArray.length > 0) {
          setOperativo(filteredArray);
        } else {
          setOperativo(primerArreglo);
        }
        break;

      default:
        setOperativo(primerArreglo);
        break;
    }
  };

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
      format: (row) => obtenerMesYAño(row.fecha),
    },
    { name: "Descripción", selector: (row) => row.descripcion, sortable: true },
  ];

  return (
    <div className="card">
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <h1>Operativos</h1>
          <h5 className="subtitulo" style={{ color: "#5DADE2" }}>
            Listado de todos los Operativos
          </h5>
          <br />

          <MultiFilter>
            <div className="mb-3">
              <label htmlFor="inputRef" className="fw-bold form-label">
                Proceso de Donación:
              </label>
              <input
                id="inputRef"
                name="ref"
                type="text"
                className="form-control"
                placeholder="1234"
                onChange={handleOnChange}
                value={search.ref}
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputDesc" className="fw-bold form-label">
                Descripción:
              </label>
              <input
                id="inputDesc"
                type="text"
                name="descripcion"
                className="form-control"
                placeholder="Ablación..."
                onChange={handleOnChange}
                value={search.descripcion}
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
