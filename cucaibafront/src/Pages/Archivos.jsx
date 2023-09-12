import React, { useEffect, useState } from "react";
import { usePagination } from "../hooks/usePagination";
import { useVerOrdenDePago } from "../hooks/useOrdenesDePago";
import DataTable from "react-data-table-component";
import EmptyTable from "../components/UI/EmptyTable";
import Spinner from "../components/UI/Spinner";
import { ArchivoAPI } from "../api/ArchivoAPI";
import { validateFecha } from "../utils/Validaciones";
import Modal from "../components/UI/Modal";
import InputField from "../components/UI/InputField";
import Layout from "../components/Layout/LayoutContainer";
import moment from "moment";

const Archivos = () => {
  const { data, isFetched, isFetching } =
    useVerOrdenDePago(true).verOrdenesQuery;
  const { paginationOptions } = usePagination(data);

  const [dateInput, setDateInput] = useState("");
  const [errorDate, setErrorDate] = useState({ type: 0 });

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
      name: "Acciones",
      cell: (row) => (
        <>
          <Modal
            title="Generar Archivo de Transferencia"
            referenceID="modalArchivo"
            size="modal-md"
            handleClose={() => {
              setDateInput(""), setErrorDate({ type: 0 });
            }}
          >
            <div>
              <div className="d-flex gap-2 align-items-center justify-content-center h-full">
                <InputField
                  inputKey="Fecha de Emisión"
                  label="Fecha de Emisión"
                  inputType="date"
                  min="2022-01-01"
                  value={dateInput}
                  onChange={(e) => {
                    const newDate = moment(new Date(e.target.value)).format(
                      "YYYY-MM-DD"
                    );
                    setDateInput(newDate);
                    setErrorDate({
                      type: validateFecha(e.target.value)
                        ? 1
                        : e.target.value < e.target.min
                        ? 2
                        : 0,
                    });
                  }}
                />
                <button
                  className="btn btn-sm btn-secondary m-2"
                  onClick={() => {
                    let fecha = dateInput.split("-").reverse().join("/");
                    handleClick(row.liquidacion_id, fecha);
                    setDateInput("");
                  }}
                  disabled={errorDate.type != 0 || dateInput == ""}
                >
                  Generar Archivo
                </button>
              </div>
              {errorDate.type == 1 && (
                <span style={{ color: "red" }}>
                  La fecha no puede ser posterior al dia de hoy
                </span>
              )}
              {errorDate.type == 2 && (
                <span style={{ color: "red" }}>
                  La fecha no puede ser anterior al año 2022
                </span>
              )}
            </div>
          </Modal>
          <button
            className="btn btn-sm btn-secondary m-2"
            data-bs-toggle="modal"
            data-bs-target="#modalArchivo"
          >
            Generar Archivo
          </button>
        </>
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
        setDateInput("");
        setErrorDate({ type: 0 });
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
        if (mod.hasOwnProperty("op_nro")) {
          const opNumber = mod.op_nro;
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
    <Layout
      Titulo="Archivos de Transferencia"
      Subtitulo="Listado de todas las órdenes de pago con numeración definitiva"
    >
      {isFetched && !isFetching ? (
        <>
          <div className="input-group mb-3" style={{ maxWidth: "40%" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por Número de OP Definitivo"
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
        </>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

export default Archivos;
