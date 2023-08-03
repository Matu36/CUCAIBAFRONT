import React from 'react';
import { useVerOrdenDePago } from '../hooks/useOrdenesDePago';
import DataTable from "react-data-table-component";
import EmptyTable from "../components/UI/EmptyTable";
import { usePagination } from "../hooks/usePagination";
import { Link } from "react-router-dom";
import "../assets/styles/detalle.css";
import Spinner from "../components/UI/Spinner";
import BackButton from "../components/UI/BackButton";

export const VerOrdenes = ({ ...props }) => {

    const { data, isFetched, refetch } = useVerOrdenDePago().verOrdenesQuery;

    const { paginationOptions } = usePagination(data);

    const columns = [
       
        { name: "Número de Liquidación", selector: (row) => row.liquidacion_id, sortable: true },
        {
          name: "Acciones",
          cell: (row) => (
            <Link to={`/ordenes/ver-ordenes/${row.liquidacion_id}`}>
              <button className="btn btn-success btn-md">
                Ver detalle de la Orden de pago
              </button>
            </Link>
          ),
        },
      ];

  return (
    
    <div className="card">
    {isFetched ? (
      <>
        <h1>Órdenes de Pago</h1>
        <h5 className="subtitulo" style={{ color: "#5DADE2" }}>
          Listado de todas las órdenes de pago
        </h5>
        <br />

        {/* <div className="input-group mb-3" style={{ maxWidth: "40%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por APELLIDO o CUIL"
            onChange={handleOnChange}
            value={search}
            autoComplete="off"
          />
        </div> */}

        <DataTable
          columns={columns}
          data={data}
          pagination
          striped
          paginationComponentOptions={paginationOptions}
          noDataComponent={
            <EmptyTable msg="No hay órdenes de pago" />
          }
          {...props}
        />
        <div>
          <BackButton />
        </div>
      </>
    ) : (
      <Spinner />
    )}
  </div>
);
};
