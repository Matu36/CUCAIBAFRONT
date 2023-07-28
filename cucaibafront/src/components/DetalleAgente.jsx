import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/styles/detalle.css";
import { obtenerMesYAño } from "../utils/MesAño";
import BackButton from "../components/UI/BackButton";
import { useAgentesPorId } from "../hooks/useAgentes";
import Spinner from "./UI/Spinner";
import Swal from "sweetalert2";


const DetalleAgente = () => {
  const { id } = useParams();

  const { agentesPorIdQuery } = useAgentesPorId(id);

  const {data: agenteData, isLoading} = agentesPorIdQuery;

  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);

  if (isLoading) {
    return  <Spinner />
  }

  if(!agenteData){
    Swal.fire({
      position: "center",
      icon: "info",
      title:
        "El agente seleccionado no tiene datos para mostrar",
      showConfirmButton: true,
    });
  }

  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Detalle del Agente</h2>
      </div>
      <div className="card-body">
        <div className="data-row">
          <div className="label">Apellido:</div>
          <div className="value">{agenteData[0].apellido}</div>
        </div>
        <div className="data-row">
          <div className="label">Nombre:</div>
          <div className="value">{agenteData[0].nombre}</div>
        </div>
        <div className="data-row">
          <div className="label">CBU:</div>
          <div className="value">{agenteData[0].cbu}</div>
        </div>
        <div className="data-row">
          <div className="label">CUIL:</div>
          <div className="value">{agenteData[0].cuil}</div>
        </div>
      </div>
      <div>
        <button onClick={toggleDesplegable} className="btn btn-success btn-md">
          Ver Operativos Asociados
        </button>
      </div>
      {mostrarDesplegable && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "center",
          }}
        >
          {agenteData[0].operativo_id ? (
            agenteData.map((operativo) => (
              <div
                className="card"
                style={{
                  width: "18rem;",
                  marginTop: "1rem",
                  padding: "1rem",
                  paddingLeft: "1rem",
                }}
                key={operativo.operativo_id}
              >
                <div class="card-body">
                  <br />
                  <h5 className="card_title">Número de PD: </h5>
                  {operativo.referencia}
                  <br />
                  <h5 className="card_title">Función Desempeñada: </h5>
                  {operativo.descripcion}
                  <br />
                  <h5 className="card_title">Valor: $ </h5>
                  {operativo.valor.toFixed(2)}
                  <br />
                  <h5 className="card_title">Fecha: </h5>
                  {obtenerMesYAño(operativo.fecha)}
                </div>
              </div>
            ))
          ) : (
            <div>No hay operativos asociados</div>
          )}
        </div>
      )}
      <br />
      <div>
        <BackButton />
      </div>
    </div>
  );
};

export default DetalleAgente;
