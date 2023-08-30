import React, { useState, useEffect } from "react";
import {
  useOrdenesMutation,
  useVerOrdenDePago,
} from "../hooks/useOrdenesDePago";
import { OrdenesDePagoAPI } from "../api/OrdenesDePagoApi";
import DataTable from "react-data-table-component";
import EmptyTable from "./UI/EmptyTable";
import { usePagination } from "../hooks/usePagination";
import { Link } from "react-router-dom";
import "../assets/styles/detalle.css";
import Spinner from "./UI/Spinner";
import Modal from "./UI/Modal";
import InputField from "./UI/InputField";
import PrintOrdenPago from "./PrintOrdenPago";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

export const NUMBER_REGEX = /^[0-9]+$/;
export const STRING_REGEX = /^[a-zA-Z]+$/;

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
    min: 2022,
    max: new Date().getFullYear(),
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

labels.map((l) => (INITIAL_STATE[l.inputKey] = l.value ?? ""));
INITIAL_STATE["liquidacion_id"] = 0;

export const VerOrdenes = ({ ...props }) => {
  const { data, isFetched, refetch } = useVerOrdenDePago().verOrdenesQuery;

  const { mutate } = useOrdenesMutation().asignarDefinitivo;

  const [OP, setOP] = useState(INITIAL_STATE);
  const [error, setError] = useState(INITIAL_STATE);

  const { paginationOptions } = usePagination(data);

  const checkAllFieldsComplete = () => {
    const incompleteFields = labels.filter((l) => {
      if (l.show && !OP[l.inputKey]) {
        return true;
      }
      return false;
    });

    const nroOpComplete =
      !!OP["nro_op"].trim() ||
      incompleteFields.some((field) => field.inputKey === "nro_op");

    return incompleteFields.length === 0 && nroOpComplete;
  };

  const [allFieldsComplete, setAllFieldsComplete] = useState(
    checkAllFieldsComplete()
  );

  useEffect(() => {
    setAllFieldsComplete(checkAllFieldsComplete());
  }, [OP]);

  //ELIMINAR ORDEN DE PAGO//

  const deleteH = useMutation(
    async ({ pOPProvisorio_Nro }) => {
      return await OrdenesDePagoAPI.delete(`/delete/`, {
        data: { pOPProvisorio_Nro },
      });
    },
    {
      onSuccess: () => {
        refetch();
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Se eliminó la orden de pago correctamente",
          showConfirmButton: false,
          timer: 3000,
        });
      },
    }
  );

  const handleDelete = (pOPProvisorio_Nro) => {
    Swal.fire({
      title: "Eliminar orden de pago",
      text: `¿Estás seguro de que deseas eliminar la orden de pago Nro ${pOPProvisorio_Nro}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteH.mutate({ pOPProvisorio_Nro });
      }
    });
  };

  //FINALIZA LA ELIMINACION DE LA ORDEN DE PAGO

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
    setAllFieldsComplete(checkAllFieldsComplete());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let count = 0;
    OP["anio_op"] = OP["anio_acto"];
    for (const key in OP) {
      if (!OP[key]) count++;
    }

    if (count > 0) {
      Swal.fire({
        title: "Los campos no pueden estar vacíos",
        icon: "warning",
        timer: 3000,
      });
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
        <div className="d-flex justify-content-between align-items-center">
          <div className="dropdown dropend">
            <button
              className="btn btn-secondary dropdown-toggle dropdown-button"
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
          <div>
            {!row.op_nro && row.opprovisorio_nro && (
              <div>
                <button
                  className="btn btn-danger custom-button"
                  onClick={() => handleDelete(row.opprovisorio_nro)}
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
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
              {labels.slice(0, 6).map((l, i) => {
                const { disabled, inputKey, inputType, label, show, min, max } =
                  l;
                return (
                  show && (
                    <React.Fragment key={i}>
                      <InputField
                        inputKey={inputKey}
                        value={OP[inputKey]}
                        key={inputKey}
                        label={label}
                        error={error[inputKey]}
                        disabled={disabled}
                        inputType={inputType}
                        handleChange={handleInputChange}
                        required={true}
                        min={min ?? null}
                        max={max ?? null}
                      />
                      {i != 5 && <span>-</span>}
                    </React.Fragment>
                  )
                );
              })}
            </div>
            <InputField
              label="Nro. O.P"
              key="nro_op"
              error={error["nro_op"]}
              inputType="number"
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
              className="btn btn-guardar btn-md"
              onClick={handleSubmit}
              type="submit"
              disabled={!allFieldsComplete}
            >
              Asignar
            </button>
          </div>
        </div>
      </Modal>
      <div>
        <div className="input-group mb-3" style={{ maxWidth: "40%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por Número de OP"
            disabled={!isFetched}
            onChange={handleOnChange}
            value={search}
            autoComplete="off"
          />
        </div>
        {isFetched ? (
          <DataTable
            columns={columns}
            data={Op}
            pagination
            striped
            paginationComponentOptions={paginationOptions}
            noDataComponent={<EmptyTable msg="No hay órdenes de pago" />}
          />
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};
