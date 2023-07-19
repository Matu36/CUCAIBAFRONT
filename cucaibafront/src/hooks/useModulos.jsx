import { useQuery } from "@tanstack/react-query";
import { ModulosAPI } from "../api/ModulosAPI";

const getModulos = async () => {
  const { data } = await ModulosAPI.get("/");
  return data[0];
};

export const useModulos = () => {
  const modulosQuery = useQuery({
    queryKey: ["modulos"],
    queryFn: () => getModulos(),
  });

  return {
    modulosQuery,
  };
};
