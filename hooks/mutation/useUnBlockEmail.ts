import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const useUnblockEmail = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const response = await axios.delete('/api/auth/failed-attempts', {
        data: { email }
      });
      return response.data;
    },
    onSuccess: ({ data }) => {
      if (data) {
        toast.success(data.message ?? 'Email unblocked successfully')
      }
    },
    onError: (error: { response: { data: { error: string } } }) => {
      const errorMsg = error.response?.data?.error || 'An error occurred while unblocking the email';
      toast.error(errorMsg);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['authentication'] });
    }

  });

  const handleUnblockEmail = (email: string) => {
    mutate({ email });
  };

  return { handleUnblockEmail, isPending, isError, isSuccess, error };
};

export default useUnblockEmail;