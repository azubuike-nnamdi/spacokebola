
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetWhitelistedEmail = () => {
  const getWhitelistedEmail = async () => {
    const response = await axios.get('/api/auth/allowed-emails')
    return response.data
  }

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['authentication'],
    queryFn: getWhitelistedEmail
  })

  return { data, isPending, error, refetch }
}