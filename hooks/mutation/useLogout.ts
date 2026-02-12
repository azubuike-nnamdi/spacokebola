import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/auth/logout');
      return response.data;
    },
    onSuccess: () => {
      // Clear all queries from cache
      queryClient.clear();
      // Redirect to login
      router.push("/auth/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    }
  });
};
