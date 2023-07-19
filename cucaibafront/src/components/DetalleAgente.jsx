import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAgentes, getHonorario } from "../Redux/Actions";
import "../assets/styles/detalle.css";
import { obtenerMesYAño } from "../utils/MesAño";

const DetalleAgente = () => {
  const dispatch = useDispatch();

  const agentes = useSelector((state) => state.agentes);
  const primerArreglo = agentes.slice(0, 1)[0];
  const { id } = useParams();
  const [agente, setAgente] = useState(null);
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);

  const honorarios = useSelector((state) => state.honorario);
  const [operativosAsociados, setOperativosAsociados] = useState([]);

  useEffect(() => {
    dispatch(getHonorario());
    dispatch(getAgentes());
  }, []);

  useEffect(() => {
    if (primerArreglo && primerArreglo.length > 0) {
      const agenteSeleccionado = primerArreglo.find(
        (agente) => agente.id === parseInt(id)
      );
      setAgente(agenteSeleccionado);
    }
  }, [primerArreglo, id]);

  useEffect(() => {
    if (agente) {
      const operativosAgente = honorarios.filter(
        (honorario) => honorario.agente_id === agente.id
      );
      setOperativosAsociados(operativosAgente);
    }
  }, [agente, honorarios]);

  if (!agente) {
    return <div>Cargando...</div>;
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
          <div className="value">{agente.apellido}</div>
        </div>
        <div className="data-row">
          <div className="label">Nombre:</div>
          <div className="value">{agente.nombre}</div>
        </div>
        <div className="data-row">
          <div className="label">CBU:</div>
          <div className="value">{agente.cbu}</div>
        </div>
        <div className="data-row">
          <div className="label">CUIL:</div>
          <div className="value">{agente.cuil}</div>
        </div>
      </div>
      <div>
        <button onClick={toggleDesplegable} className="btn btn-success btn-md">
          Ver Operativos Asociados
        </button>
      </div>
      {mostrarDesplegable && (
        <div style={{ display: "flex" }}>
          {operativosAsociados.length > 0 ? (
            operativosAsociados.map((operativo) => (
              <div
                key={operativo.operativo_id}
                style={{
                  border: "1px solid gray",
                  padding: "10px",
                  marginTop: "20px",
                  marginRight: "10px",
                }}
              >
                <br />
                <span style={{ fontWeight: "bold" }}>Número de PD: </span>
                {operativo.referencia}
                <br />
                <span style={{ fontWeight: "bold" }}>
                  Función Desempeñada:{" "}
                </span>
                {operativo.descripcion}
                <br />
                <span style={{ fontWeight: "bold" }}>Valor: $ </span>
                {operativo.valor.toFixed(2)}
                <br />
                <span style={{ fontWeight: "bold" }}>Fecha: </span>
                {obtenerMesYAño(operativo.fecha)}
              </div>
            ))
          ) : (
            <div>No hay operativos asociados</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DetalleAgente;
