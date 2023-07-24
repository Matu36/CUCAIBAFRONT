import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAgentes, getHonorario } from "../Redux/Actions";
import "../assets/styles/detalle.css";
import { obtenerMesYAño } from "../utils/MesAño";
import BackButton from "../components/UI/BackButton";

const DetalleAgente = () => {
  const dispatch = useDispatch();

  const agentes = useSelector((state) => state.agentes);
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
    if (agentes && agentes.length > 0) {
      const agenteSeleccionado = agentes.find(
        (agente) => agente.id === parseInt(id)
      );
      setAgente(agenteSeleccionado);
    }
  }, [agentes, id]);

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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "center",
          }}
        >
          {operativosAsociados.length > 0 ? (
            operativosAsociados.map((operativo) => (
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
