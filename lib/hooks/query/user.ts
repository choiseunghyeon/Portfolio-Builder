import { fetchUser } from "@lib/api/user"
import { useQuery } from "react-query"

export function useUserInfo() {
  const { data } = useQuery(["user"], async () => {
    const { data } = await fetchUser()
    return data
  })
  return data
}
