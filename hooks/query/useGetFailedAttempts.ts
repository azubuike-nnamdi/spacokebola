import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetFailedAttempts = () => {
  return useQuery({
    queryKey: ['authentication'],
    queryFn: async () => {
      const response = await axios.get('/api/auth/failed-attempts');
      return response.data;
    }
  });
};

