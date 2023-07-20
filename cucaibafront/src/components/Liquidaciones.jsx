import React, { useEffect, useState } from "react";
import "../assets/styles/detalle.css";
import { useDispatch, useSelector } from "react-redux";
import { getHonorario, postHonorario } from "../Redux/Actions";
import DataTable from "react-data-table-component";
import EmptyTable from "./UI/EmptyTable";
import { usePagination } from "../hooks/usePagination";
import Spinner from "../components/UI/Spinner";

const Liquidaciones = ({ ...props }) => {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHonorario());
  }, []);

  const honorarios = useSelector((state) => state.honorario);
  const { paginationOptions } = usePagination(honorarios);

  const fechaActual = new Date();
  const fechaConHora = `${fechaActual
    .toISOString()
    .slice(
      0,
      10
    )} ${fechaActual.getHours()}:${fechaActual.getMinutes()}`;

  // Estado para almacenar las filas seleccionadas
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    { name: "PD Nro", selector: (row) => row.referencia, sortable: true },
    { name: "APELLIDO", selector: (row) => row.apellido, sortable: true },
    { name: "NOMBRE", selector: (row) => row.nombre, sortable: true },
    { name: "CUIL", selector: (row) => row.cuil, sortable: true },
    { name: "VALOR", selector: (row) => row.valor.toFixed(2), sortable: true },
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
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedData = selectedRows.map((row) => ({
      operativo_id: parseInt(row.operativo_id),
      agente_id: row.agente_id,
      modulo_id: row.modulo_id,
      fechaModif: fechaConHora,
      liquidacion_id: row.liquidacion_id,
      opprovisorio_nro: row.opprovisorio_nro,
    }));

    console.log(selectedData);
    dispatch(postHonorario(selectedData));
  };

  //---------------------------------SPINNER ------------------------------------//

  const [showSpinner, setShowSpinner] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(false);
    });
  }, []);
  if (honorarios.length === 0) {
    return <Spinner />;
  }

  //---------------------------------FIN SPINNER ------------------------------------//

  return (
    <div className="card">
      <h1>Liquidaciones Pendientes</h1>
      <h5 className="subtitulo" style={{ color: "#5DADE2" }}>
        Listado de agentes pendientes de liquidación
      </h5>
      <br />
      <form onSubmit={handleSubmit}>
        <DataTable
          columns={columns}
          data={honorarios}
          pagination
          striped
          paginationComponentOptions={paginationOptions}
          noDataComponent={
            <EmptyTable msg="No se encontro el Agente con ese CUIL" />
          }
          {...props}
        />
        <button type="submit" className="btn btn-success">
          {" "}
          Generar Orden de Pago{" "}
        </button>
      </form>
    </div>
  );
};

export default Liquidaciones;
