import { useQuery } from '@tanstack/react-query';
import { AgentesAPI } from '../api/AgentesAPI';
import { useEffect, useState } from 'react';

const getAgentes = async ()=> {
  // console.log(args);

//   const params = new URLSearchParams();

//   if (state) params.append('state', state);

//   if (labels.length > 0) {
//     const labelString: string = labels.join(',');
//     params.append('labels', labelString);
//   }

//   params.append('page', page?.toString());
//   params.append('per_page', '5');

  const { data } = await AgentesAPI.get('/');

  return data;
};

export const useAgentes = () => {
//   const [page, setPage] = useState<number>(1);

//   useEffect(() => {
//     setPage(1);
//   }, [state, labels]);

//   const nextPage = () => {
//     if (issuesQuery.data?.length === 0) return;
//     setPage((p) => p + 1);
//   };

//   const prevPage = () => {
//     if (page > 1) setPage((p) => p - 1);
//   };

  // Por medio de los {}, podemos definir keys, pero sin importar el orden, ya que va a saber a cual elemento apunta
  const agentesQuery = useQuery({
    queryKey: ['agentes'],
    queryFn: () => getAgentes(),
  });

  return {
    agentesQuery,
  };
};