import React, { useEffect, useState } from "react";
import "../assets/styles/detalle.css";
import { useDispatch, useSelector } from "react-redux";
import { getHonorario } from "../Redux/Actions";

const Liquidaciones = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHonorario());
  }, []);

  const honorarios = useSelector((state) => state.honorario);

  const [agentesSeleccionados, setAgentesSeleccionados] = useState([]);

  const handleCheckboxChange = (event, agenteId) => {
    if (event.target.checked) {
      // Si se selecciona el checkbox, agregar el agente al estado local
      setAgentesSeleccionados([...agentesSeleccionados, agenteId]);
    } else {
      // Si se deselecciona el checkbox, quitar el agente del estado local
      setAgentesSeleccionados(
        agentesSeleccionados.filter((id) => id !== agenteId)
      );
    }
  };

  return (
    <div className="card">
      <h1>Liquidaciones Pendientes</h1>
      <h5 className="subtitulo" style={{ color: "#5DADE2" }}>
        Listado de agentes pendientes de liquidación
      </h5>
      <br />
      <table>
        <thead>
          <tr>
            <th>PD Nro</th>
            <th>CUIL</th>
            <th>Apellido</th>
            <th>Nombre</th>
            <th>Valor</th>
            <th>Seleccionar</th>
          </tr>
        </thead>
        <tbody>
          {honorarios.map((agente) => (
            <tr key={agente.id}>
              <td>{agente.referencia}</td>
              <td>{agente.cuil}</td>
              <td>{agente.apellido}</td>
              <td>{agente.nombre}</td>
              <td> $ {agente.valor.toFixed(2)}</td>
              <td>
                <div className="d-flex">
                  <input
                    type="checkbox"
                    checked={agentesSeleccionados.includes(agente.id)}
                    onChange={(e) => handleCheckboxChange(e, agente.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Liquidaciones;
