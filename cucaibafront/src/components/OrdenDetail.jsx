import React from 'react';
import "../assets/styles/detalle.css";
import { useOrdenPorLiquidacionId } from '../hooks/useOrdenesDePago';
import Spinner from "../components/UI/Spinner";

export const OrdenDetail = () => {
  const liquidacion_id = 41;
  const { data, isFetched } = useOrdenPorLiquidacionId(liquidacion_id).ordenesPorIdQuery;

  // Verificar si data es un array y no un objeto
  const personasArray = Array.isArray(data) ? data[0] : []; // Si data es undefined o null, personasArray será un array vacío

  return (
    <div className='card'>
      {isFetched ? (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>PD nro</th>
              <th>CUIL</th>
              <th>Detalles</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {personasArray.map((personasData, index) => {
              return Object.entries(personasData).map(([nombre, detalles]) => {
                return (
                  <tr key={index}>
                    <td>{nombre.split(':')[1]}</td>
                    <td>{detalles.referencia}</td>
                    <td>{detalles.cuil}</td>
                    <td>
                      {detalles.items.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          <span>Descripción: {item.descripcion}</span>
                          <span>Valor Unitario: {item.valor_unitario}</span>
                        </div>
                      ))}
                    </td>
                    <td>{detalles.valor_total}</td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      ) : (
        <Spinner />
      )}
    </div>
  );
};



