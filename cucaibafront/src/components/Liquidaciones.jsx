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

const Liquidaciones = ({ ...props }) => {
  const { data, isFetched } =
    useHonorariosPendientes().honorariosPendientesQuery;

  const liquidacionesMutation = useMutation((data) => {
    return HonorariosAPI.post("/liquidar", data);
  });

  const [search, setSearch] = useState("");

  const [liquidaciones, setLiquidaciones] = useState(data);

  const { paginationOptions } = usePagination(data);

  useEffect(() => {
    if (isFetched) {
      setLiquidaciones(data);
    }
  }, []);

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

  const fechaActual = new Date();
  const fechaConHora = `${fechaActual
    .toISOString()
    .slice(0, 10)} ${fechaActual.getHours()}:${fechaActual.getMinutes()}`;

  // Estado para almacenar las filas seleccionadas
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedData = selectedRows.map((row) => ({
      honorario_id: row.id,
    }));

    console.log(JSON.stringify(selectedData));
    liquidacionesMutation.mutate(JSON.stringify(selectedData));
    // dispatch(postHonorario(selectedData));
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
      <form onSubmit={handleSubmit}>
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
        <br />
        <div className="d-flex justify-content-between">
          <div>
            <BackButton />
          </div>
          <div>
            <button type="submit" className="btn btn-success">
              {" "}
              Generar Orden de Pago{" "}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Liquidaciones;
