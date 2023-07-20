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
  //   const [page, setPage] = useState<number>(1);

  //   useEffect(() => {
  //     setPage(1);
  //   }, [state, labels]);

  //   const nextPage = () => {
  //     if (issuesQuery.data?.length === 0) return;
  //     setPage((p) => p + 1);
  //   };

  //   const prevPage = () => {
  //     if (page > 1) setPage((p) => p - 1);
  //   };

  // Por medio de los {}, podemos definir keys, pero sin importar el orden, ya que va a saber a cual elemento apunta
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
