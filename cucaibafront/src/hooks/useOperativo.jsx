import { useQuery } from "@tanstack/react-query";
import { OperativosAPI } from "../api/OperativosAPI";

const getOperativos = async () => {
  const { data } = await OperativosAPI.get("/");
  return data[0];
};

const getAgentesByOperativo = async (operativoId) => {
  const { data } = await OperativosAPI.get(`/${operativoId}/agentes`);
  return data[0];
};

export const useOperativo = (operativoId = 0) => {
  const operativosQuery = useQuery({
    queryKey: ["operativos"],
    queryFn: () => getOperativos(),
  });

  const agentesOperativoQuery = useQuery({
    queryKey: ["agentes", { operativoId }],
    queryFn: () => getAgentesByOperativo(operativoId),
  });

  return {
    operativosQuery,
    agentesOperativoQuery,
  };
};
