import React, { useState } from "react";
import PostHonorarios from "../components/PostHonorarios";
import { Outlet } from "react-router-dom";
import TablaHonorarios from "./TablaHonorarios";

export const CrearHonorarios = () => {
  // const rowDisabledCriteria = (row, id) => row.id;
  const [row, setRow] = useState(null);
  return (
    <div>
      <Outlet context={[row, setRow]} />
      <hr />
      <PostHonorarios disabled={row == null} />
    </div>
  );
};
