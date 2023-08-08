import { useMutation, useQuery } from "@tanstack/react-query";
import { OperativosAPI } from "../api/OperativosAPI";
import Swal from "sweetalert2";

const getOperativos = async () => {
  const { data } = await OperativosAPI.get("/");
  return data[0];
};

const getAgentesByOperativo = async (operativoId) => {
  const { data } = await OperativosAPI.get(`/${operativoId}/agentes`);
  return data[0];
};

const postOperativo = async (data) => {
  return await OperativosAPI.post("", data);
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

  const operativoMutation = useMutation({
    mutationKey: ["operativo-mutation"],
    mutationFn: (data) => postOperativo(data),
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "El operativo ha sido creado",
        showConfirmButton: false,
        timer: 2000,
      });
    },
    onError: () => {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Ya existe un operativo con ese Proceso de Donación",
        showConfirmButton: false,
        timer: 2000,
      });
    },
  });

  return {
    operativosQuery,
    agentesOperativoQuery,
    operativoMutation,
  };
};
