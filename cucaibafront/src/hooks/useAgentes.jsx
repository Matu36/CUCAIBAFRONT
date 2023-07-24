import { useQuery } from "@tanstack/react-query";
import { AgentesAPI } from "../api/AgentesAPI";
import { useEffect, useState } from "react";

const getAgentes = async (operativoId) => {
  if (!operativoId) {
    const { data } = await AgentesAPI.get("/");

    return data[0];
  }
  if (operativoId) {
    const { data } = await AgentesAPI.get(`/disponibles/${operativoId}`);

    return data[0];
  }
};

export const useAgentes = (operativoId = 0) => {
  const agentesQuery = useQuery({
    queryKey: ["agentes"],
    queryFn: () => getAgentes(),
  });

  const agentesDisponiblesQuery = useQuery({
    queryKey: ["agentes-disponibles", { operativoId }],
    queryFn: () => getAgentes(operativoId),
    enabled: operativoId != 0,
  });

  return {
    agentesQuery,
    agentesDisponiblesQuery,
  };
};
