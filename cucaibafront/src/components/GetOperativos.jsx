import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOperativos } from "../Redux/Actions";
import DataTable from "react-data-table-component";
import EmptyTable from "./UI/EmptyTable";
import { usePagination } from "../hooks/usePagination";
import Spinner from "./UI/Spinner";
import BackButton from "../components/UI/BackButton";
import { obtenerMesYAño } from "../utils/MesAño";
import "../assets/styles/detalle.css";

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
    });
  }, []);

  useEffect(() => {
    setOperativo(primerArreglo);
  }, []);

  //-------------------------------- SEARCHBAR --------------------------- //

  useEffect(() => {
    filterByPD(search);
  }, [search]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByPD = (value) => {
    if (!value) {
      setOperativo(primerArreglo);
    } else {
      const arrayCache = primerArreglo.filter(
        (oper) =>
          oper.referencia.toLowerCase().includes(value.toLowerCase()) ||
          oper.descripcion.toLowerCase().includes(value.toLowerCase())
      );
      setOperativo(arrayCache);
    }
  };

  //-------------------------------- FIN SEARCHBAR --------------------------- //

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

          <div className="input-group mb-3" style={{ maxWidth: "40%" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por PD o Descripción"
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
            noDataComponent={<EmptyTable msg="No se encontro el operativo" />}
          />
        </>
      )}
      <div>
      <BackButton />
      </div>
    </div>
  );
};

export default GetOperativos;
