import React from "react";
import "../../assets/styles/style.css";
import { useHonorarios } from "../../hooks/useHonorarios";

// Componente que muestra las notificaciones de las liquidaciones pendientes de los agentes

const LandingNotificacion = () => {
  const { data, isFetched } = useHonorarios().honorariosPendientesQueryHome;

  console.log(data)


  return (
    <>
      {isFetched && (
        <div
          style={{
            border: "1px solid rgba(2, 2, 2, 0.2)",
            borderRadius: "4px",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
            maxWidth: "50%",
            opacity: 0,
            animation: "fadeIn 3s forwards",
          }}
          className="mx-auto my-4 p-3"
        >
          <div
            className="mx-auto text-center"
            style={{
              padding: "20px 10px",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderRadius: "4px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>
              Ud. tiene {data} Órdenes de pago Pendientes
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingNotificacion;
