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
            padding: "10px",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            maxWidth: "50%",
            opacity: 0,
            animation: "fadeIn 3s forwards",
          }}
        >
          <div
            className="mx-auto text-center"
            style={{
              padding: "10px",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderRadius: "4px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>
              Ud tiene {primerArreglo.length} liquidaciones de agentes
              pendientes
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingNotificacion;
