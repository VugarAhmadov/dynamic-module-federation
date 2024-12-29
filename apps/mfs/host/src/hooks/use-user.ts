import { IUser } from '../types';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
  return useQuery({
    queryKey: ['user', 1],
    queryFn: () =>
      fetch('http://localhost:8080/api/users/1')
        .then((res) => res.json())
        .then(({ data }) => data as IUser),
    staleTime: Infinity,
    throwOnError: true,
  });
};
