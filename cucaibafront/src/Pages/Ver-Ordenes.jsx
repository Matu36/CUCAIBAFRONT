import React, { useState } from "react";
import {
  useOrdenesMutation,
  useVerOrdenDePago,
} from "../hooks/useOrdenesDePago";
import DataTable from "react-data-table-component";
import EmptyTable from "../components/UI/EmptyTable";
import { usePagination } from "../hooks/usePagination";
import { Link } from "react-router-dom";
import "../assets/styles/detalle.css";
import Spinner from "../components/UI/Spinner";
import BackButton from "../components/UI/BackButton";
import Modal from "../components/UI/Modal";
import InputField from "../components/UI/InputField";

const NUMBER_REGEX = /^[0-9]+$/;
const STRING_REGEX = /^[a-zA-Z]+$/;

const labels = [
  {
    label: "Nro. O.P Provisorio",
    disabled: true,
    inputKey: "op_provisorio",
    inputType: "number",
    show: false,
  },

  {
    label: "Tipo Acto",
    disabled: false,
    inputKey: "tipo_acto",
    inputType: "text",
    show: true,
  },
  {
    label: "Año Acto",
    disabled: false,
    inputKey: "anio_acto",
    inputType: "number",
    show: true,
  },
  {
    label: "Nro. Acto",
    disabled: false,
    inputKey: "nro_acto",
    inputType: "number",
    show: true,
  },
  {
    label: "Gdeba Acto",
    disabled: true,
    inputKey: "gdeba_acto",
    inputType: "text",
    show: true,
    value: "GDEBA",
  },
  {
    label: "Reparticion Acto",
    disabled: false,
    inputKey: "reparticion_acto",
    inputType: "string",
    show: true,
  },
  {
    label: "Nro. O.P Definitivo",
    disabled: false,
    inputKey: "nro_op",
    inputType: "number",
    show: true,
  },
  {
    label: "Año O.P Definitivo",
    disabled: false,
    inputKey: "anio_op",
    inputType: "number",
    show: false,
  },
];

const INITIAL_STATE = {};

labels.map((l) => (INITIAL_STATE[l.inputKey] = l.value));
INITIAL_STATE["liquidacion_id"] = 0;

export const VerOrdenes = ({ ...props }) => {
  const { data, isFetched, refetch } = useVerOrdenDePago().verOrdenesQuery;

  const { mutate } = useOrdenesMutation().asignarDefinitivo;

  const [OP, setOP] = useState(INITIAL_STATE);
  const [error, setError] = useState(INITIAL_STATE);

  const { paginationOptions } = usePagination(data);

  const handleInputChange = (e) => {
    switch (e.target.type) {
      case "text":
        setError({
          ...error,
          [e.target.name]: !STRING_REGEX.test(e.target.value),
        });
        break;

      case "number":
        setError({
          ...error,
          [e.target.name]: !NUMBER_REGEX.test(e.target.value),
        });
        break;
    }
    setOP({ ...OP, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let count = 0;
    OP["anio_op"] = OP["anio_acto"];
    for (const key in OP) {
      if (!OP[key]) count++;
    }

    if (count > 0) {
      return;
    } else {
      mutate(OP);
      setOP(INITIAL_STATE);
    }
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
                  setOP({
                    ...OP,
                    op_provisorio: row.opprovisorio_nro,
                    liquidacion_id: row.liquidacion_id,
                  })
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
      <Modal
        title="Asignar Numeración Definitiva"
        referenceID="opDefinitiva"
        customFooter={true}
      >
        <div>
          <form>
            <div
              className="d-flex gap-2 align-items-center"
              style={{
                flexDirection: window.innerWidth < 1000 ? "column" : "row",
              }}
            >
              {labels.slice(0, 6).map(
                (l, i) =>
                  l.show && (
                    <>
                      <InputField
                        inputKey={l.inputKey}
                        value={OP[l.inputKey]}
                        key={i}
                        label={l.label}
                        error={error[l.inputKey]}
                        disabled={l.disabled}
                        inputType={l.inputType}
                        handleChange={handleInputChange}
                      />
                      {i != 5 && <span>-</span>}
                    </>
                  )
              )}
            </div>
            <InputField
              label="Nro. O.P"
              inputType="text"
              inputKey="nro_op"
              value={OP["nro_op"]}
              handleChange={handleInputChange}
            />
          </form>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Salir
            </button>
            <button
              className="btn btn-success btn-md"
              onClick={handleSubmit}
              type="submit"
            >
              Asignar
            </button>
          </div>
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
