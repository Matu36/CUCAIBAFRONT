import React, { useState, useEffect } from "react";
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
import PrintOrdenPago from "../components/PrintOrdenPago";
import { useOrdenPorLiquidacionId } from "../hooks/useOrdenesDePago";
import { useParams } from "react-router-dom";

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
    inputType: "text",
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

  const [openPDF, setOpenPDF] = useState(false);

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
      name: "Nro O.P Definitivo",
      selector: (row) => row.op_nro,
      sortable: true,
      format: (row) => row.op_nro ?? <i>Sin Asignar</i>,
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
            <li key="detalle-link">
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
            {!row.op_nro && (
              <li key="definitiva-link">
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
            )}
            <li>
              {row.op_nro === null && (
                <button
                  className="dropdown-item w-100 d-flex justify-content-end align-items-center"
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#d3d3d3")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#fff")
                  }
                >
                  <PrintOrdenPago
                    personasExceptLast={row.personasExceptLast}
                    liquidacionId={row.liquidacion_id}
                    opProvisoria={row.opprovisorio_nro}
                  />
                </button>
              )}
            </li>
          </ul>
        </div>
      ),
    },
  ];

  const [Op, setOp] = useState(data);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setOp(data);
  }, [data]);

  useEffect(() => {
    filterByOp(search);
  }, [search]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByOp = (value) => {
    if (!value) {
      setOp(data);
    } else {
      const arrayCache = data.filter((mod) => {
        if (mod.hasOwnProperty("opprovisorio_nro")) {
          const opNumber = mod.opprovisorio_nro;
          if (typeof opNumber === "number") {
            return opNumber.toString().includes(value);
          }
        }
        return false;
      });
      setOp(arrayCache);
    }
  };

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
                    <React.Fragment key={i}>
                      <InputField
                        inputKey={l.inputKey}
                        value={OP[l.inputKey]}
                        key={l.inputKey}
                        label={l.label}
                        error={error[l.inputKey]}
                        disabled={l.disabled}
                        inputType={l.inputType}
                        handleChange={handleInputChange}
                        required={true}
                      />
                      {i != 5 && <span>-</span>}
                    </React.Fragment>
                  )
              )}
            </div>
            <InputField
              label="Nro. O.P"
              key="nro_op"
              inputType="text"
              inputKey="nro_op"
              value={OP["nro_op"]}
              handleChange={handleInputChange}
              required={true}
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

            <div className="input-group mb-3" style={{ maxWidth: "40%" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por Número de OP"
                onChange={handleOnChange}
                value={search}
                autoComplete="off"
              />
            </div>

            <DataTable
              columns={columns}
              data={Op}
              pagination
              striped
              paginationComponentOptions={paginationOptions}
              noDataComponent={<EmptyTable msg="No hay órdenes de pago" />}
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
