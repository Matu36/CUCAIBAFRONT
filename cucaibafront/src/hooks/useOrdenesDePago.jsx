import { useMutation, useQuery } from "@tanstack/react-query";
import { OrdenesDePagoAPI } from "../api/OrdenesDePagoApi";
import Swal from "sweetalert2";

const getOrdenByLiquidacionId = async (liquidacion_id) => {
  const { data } = await OrdenesDePagoAPI.get(`/${liquidacion_id}`);
  return data;
};

export const useOrdenPorLiquidacionId = (liquidacion_id) => {
  const ordenesPorIdQuery = useQuery({
    queryKey: ["ordenes-por-id", { liquidacion_id }],
    queryFn: () => getOrdenByLiquidacionId(liquidacion_id),
    enabled: !!liquidacion_id,
  });

  return {
    ordenesPorIdQuery,
  };
};

const verOrdenDePago = async (definitivo) => {
  const { data } = await OrdenesDePagoAPI.get(
    `/ver/all?definitivo=${definitivo}`
  );
  return data;
};

export const useVerOrdenDePago = (definitivo = false) => {
  const verOrdenesQuery = useQuery({
    queryKey: ["ordenes-all", { definitivo }],
    queryFn: () => verOrdenDePago(definitivo),
  });

  return {
    verOrdenesQuery,
  };
};

const asignarDefinitivoOP = async (data) => {
  return await OrdenesDePagoAPI.post("/asignar-definitiva", data);
};

export const useOrdenesMutation = () => {
  const { refetch } = useVerOrdenDePago().verOrdenesQuery;
  const asignarDefinitivo = useMutation({
    mutationKey: ["asignarDefinitivo"],
    mutationFn: (data) => asignarDefinitivoOP(data),
    onSuccess: (data) => {
      refetch();
      Swal.fire({
        title: "Se asigno la numeración definitiva a la O.P",
        timer: 5000,
        icon: "success",
        confirmButtonText: "Cerrar",
        confirmButtonColor: "#4CAF50",
      });

      let modalEl = document.getElementById("opDefinitiva");
      let modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance.hide();
    },
    onError: (error) => {
      Swal.fire({
        title: "Hubo un error",
        timer: 5000,
        html: error.response.data,
        icon: "error",
        confirmButtonText: "Cerrar",
        confirmButtonColor: "#4CAF50",
      });
      let modalEl = document.getElementById("opDefinitiva");
      let modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance.hide();
    },
  });

  return { asignarDefinitivo };
};
