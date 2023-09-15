import React, { useState, useEffect, useContext } from "react";
import "./styles/tablaHonorarios.css";
import "../lib/tooltip";
import { usePagination } from "../hooks/usePagination";
import EmptyTable from "../components/UI/EmptyTable";
import DataTable from "react-data-table-component";
import "../assets/styles/detalle.css";
import moment from "moment";
import RowExpandedComponent from "../components/UI/Table/RowExpandedComponent";
import Spinner from "../components/UI/Spinner";
import Layout from "../components/Layout/LayoutContainer";
import { FaSearch } from "react-icons/fa";
import { useOperativo } from "../hooks/useOperativo";
import SpinnerNuevo from "../components/UI/SpinnerNuevo";
import LoadingContext from "../context/LoadingContext";

const TablaHonorarios = () => {
  const { toggleLoading } = useContext(LoadingContext);
  const [search, setSearch] = useState("");

  const [clicked, setClicked] = useState(false);
  const { data, refetch, isLoading, isFetching, isFetched } = useOperativo(
    0,
    search,
    clicked
  ).operativoQuery;

  //-------------------------------- SEARCHBAR --------------------------- //

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFindOperativo = () => {
    setClicked(true);
    refetch();
    setClicked(false);
    setSearch("");
  };

  useEffect(() => {
    toggleLoading(isFetching);
    console.log(isFetching);
  }, [isFetching]);

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
        <div className="input-group inputSearch">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por Proceso de Donación"
            onChange={handleOnChange}
            value={search}
            autoComplete="off"
          />
          <button
            disabled={!search}
            className="btn btn-buscar d-flex align-items-center justify-content-center gap-2"
            onClick={handleFindOperativo}
          >
            <FaSearch />
            <span>Buscar</span>
          </button>
        </div>
      </div>
      {/* <DataTable
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
      /> */}

      {data && !isLoading && !isFetching && (
        <RowExpandedComponent data={data} />
      )}
    </Layout>
  );
};

export default TablaHonorarios;
