import React from 'react';
import "../assets/styles/detalle.css";
import { useOrdenPorLiquidacionId } from '../hooks/useOrdenesDePago';

export const OrdenDetail = () => {
  const liquidacion_id = 41;
  const { data, isFetched } = useOrdenPorLiquidacionId(liquidacion_id).ordenesPorIdQuery;


  const personas = Array.isArray(data) ? data[0] : {};
  console.log(personas);

  return (
    <div className='card'>
      {isFetched ? (
        <table>
          <thead>
            <tr>
              <th>Apellido y Nombre</th>
              <th>Referencia</th>
              <th>CUIL</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(personas).map(([nombre, persona], index) => (
              <tr key={index}>
                <td>{nombre}</td>
                <td>{persona.referencia}</td>
                <td>{persona.cuil}</td>
                {/* <td>{persona.items.map((item, i) => (
                  <div key={i}>
                    <span>Función: {item.funcion}</span>
                    <span>Valor Unitario: {item.valor_unitario}</span>
                    <span>Valor Total: {item.valor_total}</span>
                  </div>
                ))}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};



