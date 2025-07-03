import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const useWhitelistEmail = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: (emailAddress: string) => {
      return axios.post(`/api/auth/allowed-emails`, {
        email: emailAddress // Changed from emailAddress to email
      });
    },
    onSuccess: ({ data }) => {

      if (data) {
        toast.success(data.message ?? 'Email whitelisted successfully')
      }
    },
    onError: (error: { response: { data: { error: string } } }) => {
      const errorMsg = error.response?.data?.error || 'An error occurred while whitelisting the email';
      console.log('Whitelist email error:', errorMsg);
      toast.error(errorMsg)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["allowed-emails"] });
    }
  });

  const handleWhitelistEmail = (payload: string) => {
    mutate(payload);
  };

  return {
    isPending,
    isError,
    isSuccess,
    error,
    handleWhitelistEmail,
  };
};

export default useWhitelistEmail;