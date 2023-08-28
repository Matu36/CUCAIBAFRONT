import { useMutation, useQuery } from "@tanstack/react-query";
import { ModulosAPI } from "../api/ModulosAPI";
import { HonorariosAPI } from "../api/HonorariosAPI";
import Swal from "sweetalert2";

// Función para obtener módulos según el operativo
const getModulos = async (operativoId) => {
  if (!operativoId) {
    // Obtener todos los módulos
    const { data } = await ModulosAPI.get("/");
    return data[0];
  }

  if (operativoId) {
    // Obtener módulos activos para el operativo
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

  // Mutación para dar de baja un módulo
  const modulosMutation = useMutation({
    mutationKey: ["baja-modulo"],
    mutationFn: async (id) => await ModulosAPI.put(`/baja/${id}`),
    onSuccess: () => {
      modulosQuery.refetch();
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Se dio de baja el modulo",
        showConfirmButton: false,
        timer: 4000,
      });
    },
    onError: (error) => {
      // Manejar errores de manera diferente según el status de la respuesta
      switch (error.response.status) {
        case 405:
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Hubo un problema",
            html: error.response.data,
            showConfirmButton: false,
            timer: 4000,
          });
          break;

        default:
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Hubo un problema",
            showConfirmButton: false,
            timer: 4000,
          });
          break;
      }
    },
  });

  return {
    modulosQuery,
    modulosActivosQuery,
    modulosMutation,
  };
};
