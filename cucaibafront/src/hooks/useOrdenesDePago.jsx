import { useQuery } from "@tanstack/react-query";
import {OrdenesDePagoAPI} from "../api/OrdenesDePagoApi";

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
}