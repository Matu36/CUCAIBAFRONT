import { useQuery } from "@tanstack/react-query";
import { PersonasAPI } from "../api/PersonasAPI";

const getPersonaByDNI = async (dni) => {
  const { data } = await PersonasAPI.get(`/${dni}`);

  return data;
};

export const usePersona = (dni = 0) => {
  const personaQuery = useQuery({
    queryKey: ["persona", dni],
    queryFn: () => getPersonaByDNI(dni),
    enabled: dni != 0,
  });

  return {
    personaQuery,
  };
};
