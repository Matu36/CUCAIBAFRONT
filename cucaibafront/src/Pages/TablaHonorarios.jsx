import React, { useState, useEffect } from "react";
import "./styles/tablaHonorarios.css";
import "../lib/tooltip";
import { usePagination } from "../hooks/usePagination";
import EmptyTable from "../components/UI/EmptyTable";
import DataTable from "react-data-table-component";
import "../assets/styles/detalle.css";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import RowExpandedComponent from "../components/UI/Table/RowExpandedComponent";
import { getHonorario, getOperativos } from "../Redux/Actions";
import Spinner from "../components/UI/Spinner";
import BackButton from "../components/UI/BackButton";

const TablaHonorarios = () => {
  const dispatch = useDispatch();
  const operativos = useSelector((state) => state.operativos);
  const primerArregloOper = operativos.slice(0, 1)[0];
  const [search, setSearch] = useState("");
  const [honorario, setHonorario] = useState(primerArregloOper);
  const { paginationOptions } = usePagination(primerArregloOper);

  //Renderizado de los operativos //

  useEffect(() => {
    dispatch(getOperativos());
  }, []);

  useEffect(() => {
    setHonorario(primerArregloOper);
  }, [primerArregloOper]);

  const [showSpinner, setShowSpinner] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(false);
    });
  }, []);

  //Renderizando los honorarios //
  const honorarios = useSelector((state) => state.honorario);
  const primerArreglo = honorarios.slice(0, 1)[0];
  const [honorar, setHonorar] = useState(primerArreglo);

  useEffect(() => {
    dispatch(getHonorario());
  }, []);

  useEffect(() => {
    setHonorar(primerArreglo);
  }, []);

  //-------------------------------- SEARCHBAR --------------------------- //

  useEffect(() => {
    filterByReferencia(search);
  }, [search]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByReferencia = (value) => {
    if (!value) {
      setHonorario(primerArregloOper);
    } else {
      const arrayCache = primerArregloOper.filter((oper) =>
        oper.referencia.toLowerCase().includes(value.toLowerCase())
      );
      setHonorario(arrayCache);
    }
  };

  //-------------------------------- FIN SEARCHBAR --------------------------- //

  //SPINNER//

  if (operativos.length === 0) {
    return <Spinner />;
  }
  //SPINNER//

  const columns = [
    {
      name: "Proceso de Donación",
      selector: (row) => row.referencia,
      sortable: true,
    },
    {
      name: "Fecha del Operativo",
      selector: (row) => row.fecha,
      sortable: true,
      format: (row) => moment(row.fecha).format("L"),
    },
    {
      name: "Descripción del Operativo",
      selector: (row) => row.descripcion,
      sortable: true,
    },
  ];

  return (
    <>
      <div className="card">
        <div className="mb-5">
          <h1>Honorarios</h1>
          <h5 className="subtitulo" style={{ color: "#5DADE2" }}>
            Carga de Honorarios Variables
          </h5>
          <hr />
          <div className="input-group mb-3" style={{ maxWidth: "40%" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por Proceso de Donación"
              onChange={handleOnChange}
              value={search}
              autoComplete="off"
            />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={honorario}
          pagination
          striped
          paginationComponentOptions={paginationOptions}
          noDataComponent={
            <EmptyTable msg="No se encontró el PD con ese número de Referencia" />
          }
          expandableRows
          expandableRowsComponent={RowExpandedComponent}
        />
        <div>
          <BackButton />
        </div>
      </div>
    </>
  );
};

export default TablaHonorarios;
