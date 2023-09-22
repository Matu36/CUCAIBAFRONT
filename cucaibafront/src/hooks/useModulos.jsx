import { useMutation, useQuery } from "@tanstack/react-query";
import { ModulosAPI } from "../api/ModulosAPI";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { ModulosValorAPI } from "../api/ModuloValorAPI";

// Función para obtener módulos según el operativo
const getModulos = async (operativoId, valor) => {
  if (!operativoId) {
    // Obtener todos los módulos
    const { data } = await ModulosAPI.get(
      `/?valor=${valor ? "true" : "false"}`
    );
    return data[0];
  }

  if (operativoId) {
    // Obtener módulos activos para el operativo
    const { data } = await ModulosValorAPI.get(`/activos/${operativoId}`);
    return data;
  }
};

const getModulosValor = async () => {
  const { data } = await ModulosValorAPI.get("");
  return data;
};

export const useModulos = (operativoId = 0, valor = false) => {
  const location = useLocation();

  const modulosQuery = useQuery({
    queryKey: ["modulos", { valor }],
    queryFn: () => getModulos(0, valor),
    enabled: location.pathname.includes("modulos"),
  });

  const modulosValorQuery = useQuery({
    queryKey: ["modulos-valor"],
    queryFn: () => getModulosValor(),
  });

  const modulosActivosQuery = useQuery({
    queryKey: ["modulos-activos", { operativoId }],
    queryFn: () => getModulos(operativoId, valor),
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

      // window.close();

      // window.location.reload();
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

  const crearModuloValor = useMutation({
    mutationKey: ["crear-modulo-valor"],
    mutationFn: async (data) =>
      await ModulosValorAPI.post("", {
        moduloId: data.id,
        fechaDesde: data.fechaDesde,
        valor: data.valor,
      }),
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Se ha asignado el valor correctamente",
        showConfirmButton: false,
        timer: 3000,
      });

      window.close();

      window.location.reload();
    },
    onError: (err) => {
      switch (err.response.status) {
        case 404:
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Hubo un error",
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
    modulosValorQuery,
    modulosActivosQuery,
    modulosMutation,
    crearModulo,
    crearModuloValor,
  };
};
