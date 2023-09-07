import { useMutation, useQuery } from "@tanstack/react-query";
import { ModulosAPI } from "../api/ModulosAPI";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();

  const modulosQuery = useQuery({
    queryKey: ["modulos"],
    queryFn: () => getModulos(),
    enabled: location.pathname.includes("modulos"),
  });

  const modulosActivosQuery = useQuery({
    queryKey: ["modulos-activos", { operativoId }],
    queryFn: () => getModulos(operativoId),
    enabled: operativoId != 0,
  });

  const crearModulo = useMutation({
    mutationKey: ["crear-modulo"],
    mutationFn: async (data) => await ModulosAPI.post("", data),
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "El modulo ha sido creado",
        showConfirmButton: false,
        timer: 3000,
      });

      window.close();

      window.location.reload();
    },
    onError: (err) => {
      switch (err.response.status) {
        case 409:
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Ya existe un módulo con esa descripción",
            showConfirmButton: true,
            confirmButtonText: "Cerrar",
            confirmButtonColor: "#4CAF50",
          });
          break;

        default:
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Hubo un error",
            showConfirmButton: true,
            confirmButtonText: "Cerrar",
            confirmButtonColor: "#4CAF50",
          });
          break;
      }
    },
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
    crearModulo,
  };
};
