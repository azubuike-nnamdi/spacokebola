
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAnnouncements = () => {
  const getAnnouncements = async () => {
    const response = await axios.get('/api/announcements')
    return response.data
  }

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['announcements'],
    queryFn: getAnnouncements
  })

  return { data, isPending, error, refetch }
}