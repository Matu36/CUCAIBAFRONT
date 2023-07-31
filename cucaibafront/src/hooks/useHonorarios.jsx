import { useQuery } from "@tanstack/react-query";
import { HonorariosAPI } from "../api/HonorariosAPI";

const getHonorarios = async (operativoId) => {
  const { data } = await HonorariosAPI.get(
    `/${operativoId != 0 ? `operativo/${operativoId}` : ""}`
  );

  return data[0];
};

const getHonorariosByAgente = async (agenteId, operativoId) => {
  const { data } = await HonorariosAPI.get(
    `/modulo/${agenteId}/${operativoId}`
  );

  return data[0];
};

export const useHonorarios = (operativoId = 0, agenteId = 0) => {
  const honorariosQuery = useQuery({
    queryKey: ["honorarios", { operativoId }],
    queryFn: () => getHonorarios(operativoId),
  });

  const honorariosAgenteQuery = useQuery({
    queryKey: ["honorarios-agente", { agenteId, operativoId }],
    queryFn: () => getHonorariosByAgente(agenteId, operativoId),
    enabled: agenteId != 0,
  });

  return {
    honorariosQuery,
    honorariosAgenteQuery,
  };
};

const getHonorariosPendientes = async () => {
  const { data } = await HonorariosAPI.get("/pendientes");

  return data[0];
};

export const useHonorariosPendientes = () => {
  const honorariosPendientesQuery = useQuery({
    queryKey: ["honorariosPendientes"],
    queryFn: () => getHonorariosPendientes(),
  });
  return {
    honorariosPendientesQuery,
  };
};

const getHonorariosPendientesHome = async () => {
  const { data } = await HonorariosAPI.get("/pendienteshome");

  return data[0];
};

export const useHonorariosPendientesHome = () => {
  const honorariosPendientesHomeQuery = useQuery({
    queryKey: ["honorariosPendientes"],
    queryFn: () => getHonorariosPendientesHome(),
  });
  return {
    honorariosPendientesHomeQuery,
  };
};
