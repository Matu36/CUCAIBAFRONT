import { useQuery } from "@tanstack/react-query";
import { ModulosAPI } from "../api/ModulosAPI";

const getModulos = async (operativoId) => {
  if (!operativoId) {
    const { data } = await ModulosAPI.get("/");
    return data[0];
  }

  if (operativoId) {
    const { data } = await ModulosAPI.get(`/activos/${operativoId}`);
    return data[0];
  }
};

export const useModulos = (operativoId = 0) => {
  const modulosQuery = useQuery({
    queryKey: ["modulos"],
    queryFn: () => getModulos(),
  });

  const modulosActivosQuery = useQuery({
    queryKey: ["modulos-activos", { operativoId }],
    queryFn: () => getModulos(operativoId),
  });

  return {
    modulosQuery,
    modulosActivosQuery,
  };
};

