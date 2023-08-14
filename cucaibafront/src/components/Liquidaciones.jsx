import React, { useEffect, useState } from "react";
import "../assets/styles/detalle.css";
import DataTable from "react-data-table-component";
import EmptyTable from "./UI/EmptyTable";
import { usePagination } from "../hooks/usePagination";
import Spinner from "../components/UI/Spinner";
import BackButton from "../components/UI/BackButton";
import Modal from "./UI/Modal";
import { useHonorarios } from "../hooks/useHonorarios";

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
          style={{
            width: "20px",
            height: "20px",
          }}
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
    { name: "VALOR", selector: (row) => row.valor.toFixed(2), sortable: true },
  ];

  const handleClick = (event) => {
    event.preventDefault();
    const selectedData = selectedRows.map((row) => ({
      honorario_id: row.id,
    }));

    const data = { array: selectedData, ...inputValue };
    if (
      inputValue.nroFolio.length > 0 &&
      inputValue.nroChequeTransferencia.length > 0
    ) {
      setInputValue({ nroFolio: "", nroChequeTransferencia: "" });
      mutate(data);
      setSelectedRows([]);
    }
  };

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: e.target.value.length == 0 });
  };

  //---------------------------------SPINNER ------------------------------------//

  const [showSpinner, setShowSpinner] = useState(true);
  useEffect(() => {
    if (isFetched) {
      setLiquidaciones(data);
      setShowSpinner(false);
    }
  }, [isFetched, data]);

  //---------------------------------FIN SPINNER ------------------------------------//

  return (
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
                <div style={{ color: "red" }}>
                  El nro de Folio es obligatorio
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="inputCheque-Transferencia" className="form-label">
                Nro de Cheque/Transferencia:{" "}
                <span style={{ color: "red" }}>*</span>
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
                <div style={{ color: "red" }}>
                  El Nro de Cheque/Transferencia es obligatorio
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
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
      <div className="card">
        <h1>Órdenes de Pago</h1>
        <h5 className="subtitulo" style={{ color: "#5DADE2" }}>
          Listado de agentes Pendientes de Orden de Pago
        </h5>
        <br />

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
          {showSpinner && <Spinner />}
          {!showSpinner && typeof data == "object" ? (
            <DataTable
              columns={columns}
              data={liquidaciones}
              pagination
              striped
              paginationComponentOptions={paginationOptions}
              noDataComponent={
                <EmptyTable msg="No se encontro el Agente con los datos proporcionados" />
              }
              {...props}
            />
          ) : (
            <EmptyTable msg="No hay ningun Agente pendiente de pago" />
          )}

          <br />
          <div className="d-flex justify-content-between">
            <div>
              <BackButton />
            </div>
            <div>
              <div>
                <h5>
                  Total: $<span>{total}</span>
                </h5>
              </div>
              <button
                type="submit"
                className="btn btn-success"
                disabled={selectedRows.length == 0}
                data-bs-toggle="modal"
                data-bs-target="#opModal"
              >
                {" "}
                Generar Orden de Pago{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Liquidaciones;
