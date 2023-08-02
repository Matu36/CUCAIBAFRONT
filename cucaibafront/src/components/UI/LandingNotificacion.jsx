import React, { useState, useEffect } from "react";
import "../../assets/styles/style.css";
import { useHonorariosPendientesHome } from "../../hooks/useHonorarios";

const LandingNotificacion = () => {
  const { data, isFetched } =
    useHonorariosPendientesHome().honorariosPendientesHomeQuery;

  return (
    <>
      {isFetched && (
        <div
          style={{
            margin: "20px auto",
            padding: "40px",
            border: "1px solid rgba(2, 2, 2, 0.2)",
            borderRadius: "4px",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
            maxWidth: "50%",
            opacity: 0,
            animation: "fadeIn 3s forwards",
          }}
        >
          <div
            className="mx-auto text-center"
            style={{
              padding: "20px",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderRadius: "4px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>
              Ud. tiene {data.length ?? 0} Órdenes de pago Pendientes
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingNotificacion;
