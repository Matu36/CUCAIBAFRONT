import React, { useEffect, useState } from "react";
import { usePagination } from "../hooks/usePagination";
import { useVerOrdenDePago } from "../hooks/useOrdenesDePago";
import DataTable from "react-data-table-component";
import EmptyTable from "../components/UI/EmptyTable";
import BackButton from "../components/UI/BackButton";
import Spinner from "../components/UI/Spinner";
import { ArchivoAPI } from "../api/ArchivoAPI";
import { validateFecha } from "../utils/Validaciones";

const Archivos = () => {
  const { data, isFetched, isFetching } =
    useVerOrdenDePago(true).verOrdenesQuery;
  const { paginationOptions } = usePagination(data);

  const [dateInput, setDateInput] = useState({ rowId: 0, dateValue: "" });
  const [errorDate, setErrorDate] = useState(false);

  const columns = [
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
      name: "Fecha de Acreditación",
      cell: (row) => (
        <div>
          <div className="d-flex gap-2 align-items-center justify-content-center h-full">
            <input
              type="date"
              className="input-group mb-3"
              value={
                row.liquidacion_id == dateInput.rowId && dateInput.dateValue
              }
              onFocus={() =>
                setDateInput({ ...dateInput, rowId: row.liquidacion_id })
              }
              onChange={(e) => {
                setDateInput({ ...dateInput, dateValue: e.target.value });
                setErrorDate(validateFecha(e.target.value));
              }}
            />
            <button
              className="btn btn-sm btn-secondary m-2"
              onClick={() => {
                let fecha = dateInput.dateValue.split("-").reverse().join("/");
                handleClick(row.liquidacion_id, fecha);
                setDateInput({ dateValue: "", rowId: 0 });
              }}
              disabled={dateInput.rowId != row.liquidacion_id || errorDate}
            >
              Generar Archivo
            </button>
          </div>
          {dateInput.rowId == row.liquidacion_id && errorDate && (
            <span style={{ color: "red" }}>
              La fecha no puede ser posterior al dia de hoy
            </span>
          )}
        </div>
      ),
    },
  ];

  const handleClick = async (id, fechaAcreditacion) => {
    try {
      await ArchivoAPI.post(
        `/generar/${id}`,
        { fechaAcreditacion },
        {
          responseType: "arraybuffer",
        }
      ).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "TR10405A.txt"); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    } catch (error) {
      console.log(error);
    }
  };

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
    <div className="container p-4">
      <div className="card">
        {isFetched && !isFetching ? (
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
    </div>
  );
};

export default Archivos;
