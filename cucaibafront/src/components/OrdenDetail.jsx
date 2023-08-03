import React from 'react';
import "../assets/styles/detalle.css";
import { useOrdenPorLiquidacionId } from '../hooks/useOrdenesDePago';
import Spinner from "../components/UI/Spinner";
import "../assets/styles/detalle.css"

export const OrdenDetail = () => {
  const liquidacion_id = 113;
  const { data, isFetched } = useOrdenPorLiquidacionId(liquidacion_id).ordenesPorIdQuery;

 
  const personasArray = Array.isArray(data) ? data[0] : []; 

  return (
    <div className='card'>
      {isFetched ? (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>CUIL</th>
              <th>PD Nro</th>
              <th>Descripción</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {personasArray.map((personasData, index) => {
              return Object.entries(personasData).map(([nombre, detalles]) => {
                return (
                  <tr key={index}>
                    <td>{nombre.split(':')[1]}</td>
                    <td>{detalles.cuil}</td>
                    <td>{detalles.referencia}</td>
                    <td>
                      {detalles.items.map((item, itemIndex) => (
                        <div key={itemIndex} style={{display:"flex", justifyContent:"space-between"}}>
                          <span>Función: {item.descripcion}</span>
                          <span>Valor: ${item.valor_unitario.toFixed(2)}</span>
                        </div>
                      ))}
                    </td>
                    <td>$ {detalles.valor_total.toFixed(2)}</td>
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



