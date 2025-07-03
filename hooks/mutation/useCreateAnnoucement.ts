import { Announcement } from "@/lib/type-declaration";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

type AnnouncementInput = Omit<Announcement, 'id'>;

const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: (payload: AnnouncementInput) => {
      return axios.post(`/api/announcements`, payload);
    },
    onSuccess: ({ data }) => {
      if (data) {
        toast.success(data.message ?? 'Announcement created successfully')
      }
    },
    onError: (error: { response: { data: { error: string } } }) => {
      const errorMsg = error.response?.data?.error || 'An error occurred while creating the announcement';
      console.log('Announcement creation error:', errorMsg);
      toast.error(errorMsg)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    }
  });

  const handleCreateAnnouncement = (payload: AnnouncementInput) => {
    mutate(payload);
  };

  return {
    isPending,
    isError,
    isSuccess,
    error,
    handleCreateAnnouncement,
  };
};

export default useCreateAnnouncement;