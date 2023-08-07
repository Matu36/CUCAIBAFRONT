import React, { useState } from "react";
import { useVerOrdenDePago } from "../hooks/useOrdenesDePago";
import DataTable from "react-data-table-component";
import EmptyTable from "../components/UI/EmptyTable";
import { usePagination } from "../hooks/usePagination";
import { Link } from "react-router-dom";
import "../assets/styles/detalle.css";
import Spinner from "../components/UI/Spinner";
import BackButton from "../components/UI/BackButton";
import Modal from "../components/UI/Modal";
import InputField from "../components/UI/InputField";

const labels = [
  {
    label: "Nro. O.P Provisorio",
    disabled: true,
    inputKey: "op_provisorio",
    inputType: "number",
  },
  {
    label: "Nro. O.P Definitivo",
    disabled: false,
    inputKey: "nro_op",
    inputType: "number",
  },
  {
    label: "Nro. O.P Provisorio",
    disabled: false,
    inputKey: "anio_op",
    inputType: "number",
  },
  {
    label: "Nro. O.P Provisorio",
    disabled: false,
    inputKey: "tipo_acto",
    inputType: "number",
  },
  {
    label: "Nro. Acto",
    disabled: false,
    inputKey: "nro_acto",
    inputType: "number",
  },
  {
    label: "Año Acto",
    disabled: false,
    inputKey: "anio_acto",
    inputType: "number",
  },
  {
    label: "Gdeba Acto",
    disabled: false,
    inputKey: "gdeba_acto",
    inputType: "number",
  },
  {
    label: "Reparticion Acto",
    disabled: false,
    inputKey: "reparticion_acto",
    inputType: "number",
  },
];

const INITIAL_STATE = {};

labels.forEach((key) => {
  INITIAL_STATE[key.inputKey] = "";
});

export const VerOrdenes = ({ ...props }) => {
  const { data, isFetched, refetch } = useVerOrdenDePago().verOrdenesQuery;

  const [OP, setOP] = useState(INITIAL_STATE);

  const { paginationOptions } = usePagination(data);

  const handleInputChange = (e) => {
    setOP({ ...OP, [e.target.name]: e.target.value });
  };

  const columns = [
    {
      name: "Número de Liquidación",
      selector: (row) => row.liquidacion_id,
      sortable: true,
    },
    {
      name: "Nro. O.P Provisorio",
      selector: (row) => row.opprovisorio_nro,
      sortable: true,
    },
    {
      cell: (row) => (
        <div className="dropdown dropend">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Ver Acciones
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <Link
                className="dropdown-item"
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#d3d3d3")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fff")
                }
                to={`/ordenes/ver-ordenes/${row.liquidacion_id}`}
              >
                Ver detalle de la Orden de pago
              </Link>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#opDefinitiva"
                onClick={() =>
                  setOP({ ...OP, op_provisorio: row.opprovisorio_nro })
                }
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#d3d3d3")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fff")
                }
              >
                Asignar Numeración Definitiva
              </button>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal title="Asignar Numeración Definitiva" referenceID="opDefinitiva">
        <div>
          <form>
            {labels.map((el, i) => (
              <InputField
                label={el.label}
                key={i}
                inputKey={el.inputKey}
                value={OP[el.inputKey]}
                disabled={el.disabled}
                inputType={el.inputType}
                handleChange={handleInputChange}
              />
            ))}
          </form>
        </div>
      </Modal>
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
              noDataComponent={<EmptyTable msg="No hay órdenes de pago" />}
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
    </>
  );
};
