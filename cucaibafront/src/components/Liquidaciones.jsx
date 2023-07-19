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
  console.log(honorarios);
 

  return (
    <div className="card">
      <h1>Liquidaciones Pendientes </h1>
      <h5 className="subtitulo" style={{ color: "#5DADE2" }}>
        Listado de agentes pendientes de liquidación
      </h5>
      <br />
    </div>
  );
};

export default Liquidaciones;
