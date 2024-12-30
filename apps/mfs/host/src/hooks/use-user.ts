import { useQuery } from "@tanstack/react-query";

import { userService } from "@host/services/user";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: userService.getUser,
    staleTime: Infinity,
    throwOnError: true,
  });
};
