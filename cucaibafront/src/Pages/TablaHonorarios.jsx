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
import { getHonorario } from "../Redux/Actions";
import Spinner from "../components/UI/Spinner";
import Layout from "../components/Layout/LayoutContainer";
import { useOperativo } from "../hooks/useOperativo";

const TablaHonorarios = () => {
  const dispatch = useDispatch();
  const operativos = useSelector((state) => state.operativos);
  const { data, isLoading } = useOperativo().operativosQuery;
  const [search, setSearch] = useState("");
  const [honorario, setHonorario] = useState(data);
  const { paginationOptions } = usePagination(data);

  const [currentRow, setCurrentRow] = useState(null);

  //Renderizado de los operativos //

  useEffect(() => {
    setHonorario(data);
  }, [data]);

  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    setShowSpinner(isLoading);
  }, [isLoading]);

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
      setHonorario(data);
    } else {
      const arrayCache = data.filter((oper) =>
        oper.referencia.toLowerCase().includes(value.toLowerCase())
      );
      setHonorario(arrayCache);
    }
  };

  //-------------------------------- FIN SEARCHBAR --------------------------- //
  moment.locale("es-mx");
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
    <Layout Titulo="Honorarios" Subtitulo="Carga de Honorarios Variables">
      <div className="mb-5">
        <div className="input-group inputSearch" style={{ maxWidth: "40%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por Proceso de Donación"
            onChange={handleOnChange}
            value={search}
            autoComplete="off"
            disabled={!data}
          />
        </div>
      </div>
      {!showSpinner ? (
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
          expandableRowExpanded={(row) => row === currentRow}
          expandOnRowClicked
          onRowExpandToggled={(bool, row) => setCurrentRow(row)}
          onRowClicked={(row) => setCurrentRow(row)}
        />
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

export default TablaHonorarios;
