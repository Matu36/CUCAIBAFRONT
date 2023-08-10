import { useMutation, useQuery } from "@tanstack/react-query";
import { HonorariosAPI } from "../api/HonorariosAPI";
import Swal from "sweetalert2";

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

const getHonorariosPendientes = async () => {
  const { data } = await HonorariosAPI.get("/pendientes");

  return data[0];
};

const getHonorariosPendientesHome = async () => {
  const { data } = await HonorariosAPI.get("/pendienteshome");

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

  const honorariosPendientesQuery = useQuery({
    queryKey: ["honorariosPendientes"],
    queryFn: () => getHonorariosPendientes(),
  });

  const honorariosPendientesHomeQuery = useQuery({
    queryKey: ["honorariosPendientes"],
    queryFn: () => getHonorariosPendientesHome(),
  });

  const liquidacionesMutation = useMutation({
    mutationKey: ["liquidar-honorarios"],
    mutationFn: async (data) => await HonorariosAPI.put("/liquidar", data),
    onSuccess: (data) => {
      honorariosPendientesQuery.refetch();
      Swal.fire({
        title: "Se genero la orden de pago",
        html:
          "<div>" +
          "<h5>" +
          "Nro. O.P Provisorio:" +
          `<span style={{ fontWeight: "bold" }}> ${data.data[1][2]}</span>` +
          "</h5>" +
          "<p>" +
          "Monto de la Ordén de Pago: $" +
          `<span style={{ fontWeight: "bold" }}> ${data.data[1][1]}</span>` +
          "</p>" +
          "</div>",
        position: "center",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
      let modalEl = document.getElementById("opModal");
      let modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance.hide();
    },
    onError: () => {
      Swal.fire({
        title: "Hubo un error",
        position: "center",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      let modalEl = document.getElementById("opModal");
      let modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance.hide();
    },
  });

  return {
    honorariosQuery,
    honorariosAgenteQuery,
    honorariosPendientesQuery,
    liquidacionesMutation,
    honorariosPendientesHomeQuery,
  };
};
