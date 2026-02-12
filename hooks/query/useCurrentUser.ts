import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCurrentUser = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await axios.get("/api/auth/current-user");
      return response.data.user;
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useCurrentUser;