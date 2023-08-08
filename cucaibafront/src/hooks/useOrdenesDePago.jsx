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

const verOrdenDePago = async () => {
  const { data } = await OrdenesDePagoAPI.get("/ver/all");
  return data;
};

export const useVerOrdenDePago = () => {
  const verOrdenesQuery = useQuery({
    queryKey: ["ordenes-all"],
    queryFn: () => verOrdenDePago(),
  });

  return {
    verOrdenesQuery,
  };
};

const asignarDefinitivoOP = async (data) => {
  return await OrdenesDePagoAPI.post("/asignar-definitiva", data);
};

export const useOrdenesMutation = () => {
  const asignarDefinitivo = useMutation({
    mutationKey: ["asignarDefinitivo"],
    mutationFn: (data) => asignarDefinitivoOP(data),
    onSuccess: (data) => {
      Swal.fire({
        title: "Se asigno la numeración definitiva a la O.P",
        timer: 5000,
        icon: "success",
      });
    },
  });

  return { asignarDefinitivo };
};
