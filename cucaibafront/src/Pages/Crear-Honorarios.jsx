import React from "react";
import PostHonorarios from "../components/PostHonorarios";
import { Outlet } from "react-router-dom";
import TablaHonorarios from "./TablaHonorarios";

export const CrearHonorarios = () => {
  // const rowDisabledCriteria = (row, id) => row.id;
  const handleChange = (e) => {
    console.log(e);
  };
  return (
    <div>
      Crear-Honorarios
      <Outlet />
      <PostHonorarios />
    </div>
  );
};
