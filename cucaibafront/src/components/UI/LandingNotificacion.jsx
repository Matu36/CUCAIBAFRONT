import React, { useEffect, useState } from "react";
import { getModulos } from "../../Redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/styles/style.css";

const LandingNotificacion = () => {
  let dispatch = useDispatch();
  const liquidaciones = useSelector((state) => state.modulos);

  let primerArreglo = [];
  if (liquidaciones.length > 1) {
    primerArreglo = liquidaciones[1][0];
  }

  const [modulo, setModulo] = useState(primerArreglo);

  useEffect(() => {
    dispatch(getModulos());
  }, []);

  useEffect(() => {
    setModulo(primerArreglo);
  }, [primerArreglo]);

  return (
    <>
      {primerArreglo.length > 0 && (
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
              Ud tiene {primerArreglo.length} Liquidaciones de Agentes
              Pendientes
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingNotificacion;
