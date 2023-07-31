import React, { useEffect, useState } from "react";
import "../assets/styles/detalle.css";
import DataTable from "react-data-table-component";
import EmptyTable from "./UI/EmptyTable";
import { usePagination } from "../hooks/usePagination";
import Spinner from "../components/UI/Spinner";
import BackButton from "../components/UI/BackButton";
import { useMutation } from "@tanstack/react-query";
import { HonorariosAPI } from "../api/HonorariosAPI";
import { useHonorariosPendientes } from "../hooks/useHonorarios";
import Swal from "sweetalert2";
import Modal from "./UI/Modal";

const Liquidaciones = ({ ...props }) => {
  const { data, isFetched, refetch } =
    useHonorariosPendientes().honorariosPendientesQuery;

  const [nroFolio, setNroFolio] = useState("");
  const [error, setError] = useState(false);

  const liquidacionesMutation = useMutation(
    (data) => {
      return HonorariosAPI.put("/liquidar", data);
    },
    {
      onSuccess: () => {
        refetch();
        Swal.fire({
          title: "Se genero la orden de pago",
          timer: 2000,
          position: "center",
          icon: "success",
        });
      },
    }
  );

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
          checked={selectedRows.some((r) => r.id === row.id)}
          onChange={() =>
            setSelectedRows((prevSelected) =>
              prevSelected.some((r) => r.id === row.id)
                ? prevSelected.filter((r) => r.id !== row.id)
                : [...prevSelected, row]
            )
          }
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

    const data = { array: selectedData, nroFolio };
    console.log(data);
    if (nroFolio.length > 0) {
      liquidacionesMutation.mutate(data);
    }
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
          <div className="mb-3">
            <label htmlFor="inputFolio" className="form-label">
              Nro de Folio Blanco: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="number"
              className="form-control"
              id="inputFolio"
              aria-describedby="inputFolioHelp"
              name="nroFolio"
              value={nroFolio}
              autoComplete="off"
              placeholder="N° de Folio Blanco"
              onChange={(e) => {
                setNroFolio(e.target.value);
                setError(e.target.value.length == 0);
              }}
            />
            {error && (
              <div style={{ color: "red" }}>El nro de Folio es obligatorio</div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleClick}
              disabled={nroFolio.length == 0}
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
        {showSpinner && <Spinner />}
        <div className="input-group mb-3" style={{ maxWidth: "40%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por APELLIDO o CUIL"
            onChange={handleOnChange}
            value={search}
            autoComplete="off"
          />
        </div>
        <div>
          {typeof data == "object" ? (
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
            <EmptyTable msg="No se encontro el Agente con los datos proporcionados" />
          )}
          <br />
          <div className="d-flex justify-content-between">
            <div>
              <BackButton />
            </div>
            <div>
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
