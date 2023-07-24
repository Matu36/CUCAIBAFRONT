import React, { useEffect, useState } from "react";
import { getHonorarioOutHash } from "../../Redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/styles/style.css";

const LandingNotificacion = () => {
  let dispatch = useDispatch();
  const liquidaciones = useSelector((state) => state.honorarioOutHash);

  const [modulo, setModulo] = useState(liquidaciones);

  useEffect(() => {
    dispatch(getHonorarioOutHash());
  }, []);

  useEffect(() => {
    setModulo(liquidaciones);
  }, [liquidaciones]);

  return (
    <>
      {liquidaciones.length > 0 && (
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
              Ud tiene {liquidaciones.length} Liquidaciones de Agentes
              Pendientes
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingNotificacion;
