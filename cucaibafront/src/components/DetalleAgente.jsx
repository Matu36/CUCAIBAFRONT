import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/styles/detalle.css";
import { obtenerMesYAño } from "../utils/MesAño";
import BackButton from "../components/UI/BackButton";
import { useAgentesPorId } from "../hooks/useAgentes";
import Spinner from "./UI/Spinner";
import Swal from "sweetalert2";
import { GoTriangleDown } from "react-icons/go";
import CardDetalleAgente from "./UI/CardDetalleAgente";

const DetalleAgente = () => {
  const { id } = useParams();

  const { agentesPorIdQuery } = useAgentesPorId(id);

  const { data: agenteData, isLoading } = agentesPorIdQuery;

  console.log(agenteData);

  if (isLoading) {
    return <Spinner />;
  }

  if (!agenteData) {
    Swal.fire({
      position: "center",
      icon: "info",
      title: "El agente seleccionado no tiene datos para mostrar",
      showConfirmButton: true,
    });
  }

  return (
    <div className="card">
      <div className="card p-0 mb-3">
        <div className="card-header">
          <h4 className="fw-bold">Ver detalles del Agente</h4>
        </div>
        <div className="card-body justify-content-evenly  d-flex gap-2 flex-wrap">
          <div className="data-row">
            <div className="value">{agenteData[0].apellido}</div>
            <div className="label">Apellido</div>
          </div>
          <div className="data-row">
            <div className="value">{agenteData[0].nombre}</div>
            <div className="label">Nombre</div>
          </div>
          <div className="data-row">
            <div className="value">{agenteData[0].cbu}</div>
            <div className="label">CBU</div>
          </div>
          <div className="data-row">
            <div className="value">{agenteData[0].cuil}</div>
            <div className="label">CUIL</div>
          </div>
          <div className="data-row">
            <div className="value">{agenteData[0].legajo}</div>
            <div className="label">Legajo</div>
          </div>
          <div className="data-row">
            <div className="value">{agenteData[0].dni}</div>
            <div className="label">DNI</div>
          </div>
        </div>
      </div>

      <div id="accordion">
        <div className="card p-0">
          <div className="card-header mb-0" id="headingOne">
            <h5 className="mb-0">
              <button
                className="btn btn-md fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                Ver Operativos Asociados{" "}
                <span>
                  <GoTriangleDown id="triangleIcon" />
                </span>
              </button>
            </h5>
          </div>

          <div
            id="collapseOne"
            className="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div className="row row-cols-1 row-cols-md-5 g-4 p-3">
              {agenteData[0].operativo_id ? (
                agenteData.map((operativo) => (
                  <CardDetalleAgente
                    data={operativo}
                    key={operativo.operativo_id}
                  />
                ))
              ) : (
                <div>No hay operativos asociados</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <br />
      <div>
        <BackButton />
      </div>
    </div>
  );
};

export default DetalleAgente;
