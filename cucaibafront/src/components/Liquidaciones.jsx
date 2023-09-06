import React, { useEffect, useState } from "react";
import "../assets/styles/detalle.css";
import DataTable from "react-data-table-component";
import EmptyTable from "./UI/EmptyTable";
import { usePagination } from "../hooks/usePagination";
import Spinner from "../components/UI/Spinner";
import Modal from "./UI/Modal";
import { useHonorarios } from "../hooks/useHonorarios";
import NumberFormatter from "../utils/NumberFormatter";
import "../components/styles/Liquidaciones.css";

// Componente que se encarga de mostrar y de Generar las Ordenes de Pago

const LIMITE = 3350000;

const Liquidaciones = ({ ...props }) => {
  const { data, isFetched } = useHonorarios().honorariosPendientesQuery;

  const [total, setTotal] = useState(0);
  const [inputValue, setInputValue] = useState({
    nroFolio: "",
    nroChequeTransferencia: "",
  });
  const [error, setError] = useState({
    nroFolio: false,
    nroChequeTransferencia: false,
  });

  const { mutate } = useHonorarios().liquidacionesMutation;

  const [search, setSearch] = useState("");

  const [liquidaciones, setLiquidaciones] = useState(data);

  const { paginationOptions } = usePagination(data);

  //---------------------------------SPINNER ------------------------------------//

  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    if (isFetched) {
      if (data) {
        setLiquidaciones(data);
      }
      setShowSpinner(false);
    }
  }, [isFetched, data]);

  //---------------------------------FIN SPINNER ------------------------------------//

  //-------------------------------- SEARCHBAR --------------------------- //

  useEffect(() => {
    filterByApellido(search);
  }, [search]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByApellido = (value) => {
    if (!value) {
      setLiquidaciones(data);
    } else {
      const arrayCache = data.filter(
        (oper) =>
          oper.apellido.toLowerCase().includes(value.toLowerCase()) ||
          oper.cuil.toLowerCase().includes(value.toLowerCase())
      );
      setLiquidaciones(arrayCache);
    }
  };

  //-------------------------------- FIN SEARCHBAR --------------------------- //

  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      name: "Seleccionar",
      cell: (row) => (
        <input
          type="checkbox"
          className="checkbox"
          onMouseOver={(e) => (e.target.style.cursor = "pointer")}
          checked={selectedRows.some((r) => r.id === row.id)}
          onChange={() => {
            setSelectedRows((prevSelected) =>
              prevSelected.some((r) => r.id === row.id)
                ? prevSelected.filter((r) => r.id !== row.id)
                : [
                    ...prevSelected,
                    {
                      ...row,
                      isClicked: true,
                    },
                  ]
            );
            setTotal((prevTotal) =>
              selectedRows.some((r) => r.id === row.id)
                ? prevTotal - Number(row.valor)
                : prevTotal + Number(row.valor)
            );
          }}
        />
      ),
    },
    {
      name: "Honorario ID",
      selector: (row) => row.id,
      omit: true,
    },
    { name: "PD Nro", selector: (row) => row.referencia, sortable: true },
    { name: "APELLIDO", selector: (row) => row.apellido, sortable: true },
    { name: "NOMBRE", selector: (row) => row.nombre, sortable: true },
    { name: "CUIL", selector: (row) => row.cuil, sortable: true },
    { name: "DESCRIPCIÓN", selector: (row) => row.descripcion, sortable: true },
    {
      name: "VALOR",
      selector: (row) => `$ ${NumberFormatter(row.valor)}`,
      sortable: true,
    },
  ];

  const handleClick = (event) => {
    event.preventDefault();
    const selectedData = selectedRows.map((row) => ({
      honorario_id: row.id,
    }));

    const data = { array: selectedData, ...inputValue };
    if (
      inputValue.nroFolio.length > 0 &&
      inputValue.nroChequeTransferencia.length > 0 &&
      total <= LIMITE
    ) {
      setInputValue({ nroFolio: "", nroChequeTransferencia: "" });
      mutate(data);
      setSelectedRows([]);
      setTotal(0);
    }
  };

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: e.target.value.length == 0 });
  };

  return (
    <>
      {isFetched ? (
        <>
          <Modal
            title="Generar Orden de Pago"
            referenceID="opModal"
            customFooter={true}
          >
            <div>
              <div className="d-flex w-full justify-content-evenly">
                <div className="mb-3">
                  <label htmlFor="inputFolio" className="form-label">
                    Nro de Folio Banco: <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputFolio"
                    aria-describedby="inputFolioHelp"
                    name="nroFolio"
                    value={inputValue.nroFolio}
                    autoComplete="off"
                    placeholder="N° de Folio Banco"
                    onChange={handleChange}
                  />
                  {error.nroFolio && (
                    <span className="spanObligatorio">
                      El nro de Folio es obligatorio
                    </span>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="inputCheque-Transferencia"
                    className="form-label"
                  >
                    Nro de Cheque/Transferencia:{" "}
                    <span className="spanObligatorio">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCheque-Transferencia"
                    aria-describedby="inputCheque-TransferenciaHelp"
                    name="nroChequeTransferencia"
                    value={inputValue.nroChequeTransferencia}
                    autoComplete="off"
                    placeholder="N° de Cheque/Transferencia"
                    onChange={handleChange}
                  />
                  {error.nroChequeTransferencia && (
                    <span className="spanObligatorio">
                      El Nro de Cheque/Transferencia es obligatorio
                    </span>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-guardar"
                  onClick={handleClick}
                  disabled={
                    inputValue.nroFolio.length == 0 ||
                    inputValue.nroChequeTransferencia.length == 0
                  }
                >
                  Generar OP
                </button>
              </div>
            </div>
          </Modal>
          <div>
            <div
              className="input-group mb-3"
              style={{ width: window.innerWidth < 1000 ? "100%" : "45%" }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por APELLIDO o CUIL"
                onChange={handleOnChange}
                value={search}
                autoComplete="off"
                disabled={liquidaciones == 400}
              />
            </div>
            <div>
              {showSpinner ? (
                <Spinner />
              ) : typeof liquidaciones === "object" &&
                liquidaciones.length > 0 ? (
                <DataTable
                  columns={columns}
                  data={liquidaciones}
                  pagination
                  striped
                  paginationComponentOptions={paginationOptions}
                  noDataComponent={
                    <EmptyTable msg="No se encontró el Agente con los datos proporcionados" />
                  }
                  {...props}
                />
              ) : (
                <EmptyTable msg="No hay ningún Agente pendiente de pago" />
              )}
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <div>
                  <h5>
                    Total: $<span>{NumberFormatter(total)}</span>
                  </h5>
                  {total > LIMITE && (
                    <span className="spanObligatorio">
                      <p>Te estas excediendo del limite de $3,500,000.00</p>
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-guardar"
                  disabled={selectedRows.length == 0 || total > LIMITE}
                  data-bs-toggle="modal"
                  data-bs-target="#opModal"
                >
                  {" "}
                  Generar Orden de Pago{" "}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Liquidaciones;
