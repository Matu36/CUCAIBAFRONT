import { useQuery } from "@tanstack/react-query";
import { HonorariosAPI } from "../api/HonorariosAPI";

const getHonorarios = async (operativoId = 0) => {
  const { data } = await HonorariosAPI.get(
    `/${operativoId != 0 ? `operativo/${operativoId}` : ""}`
  );

  return data[0];
};

export const useHonorarios = (operativoId) => {
  const honorariosQuery = useQuery({
    queryKey: ["honorarios", { operativoId }],
    queryFn: () => getHonorarios(operativoId),
  });

  return {
    honorariosQuery,
  };
};
