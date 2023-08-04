import React from "react";

const CardItem = ({ title, value }) => {
  return (
    <li className="list-group-item">
      <div className="mb-2">
        {typeof value != "object" ? (
          <>
            <h6 className="card-subtitle text-muted">{title}:</h6>
            <h5 className="card-title">{value}</h5>
          </>
        ) : (
          <>
            <h6 className="card-subtitle  text-muted">{title}:</h6>
            <ul className="p-0">
              {value.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </li>
  );
};

const CardDetalleAgente = ({ data }) => {
  const dateFormatted = new Date(data.fecha);
  const arrDate = [
    dateFormatted.getDate(),
    dateFormatted.getMonth(),
    dateFormatted.getFullYear(),
  ];
  const fullDate = arrDate.join("/");
  return (
    <div className="col">
      <div className="card h-100 w-100 p-0">
        <div
          className="card-header"
          style={{ backgroundColor: "var(--ms-main-color)", fontWeight: 600 }}
        >
          <small className="text-muted">
            {data.liquidacion_id
              ? `Orden de Pago: #${data.liquidacion_id}`
              : "Sin Orden de Pago"}
          </small>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <CardItem title="Proceso de Donación" value={data.referencia} />
            <CardItem title="Funciones" value={data.descripciones} />
            <CardItem
              title="Total Valor"
              value={`$${Number.parseFloat(data.total_valor).toFixed(2)}`}
            />
          </ul>
        </div>

        <div className="card-footer">
          <small className="text-muted">{fullDate}</small>
        </div>
      </div>
    </div>
  );
};

export default CardDetalleAgente;