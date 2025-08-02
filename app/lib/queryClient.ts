import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { User } from "~/types/user";

/**
 * React Query configuration on top of Axios HTTP request.
 *
 */

export const queryClient = new QueryClient();

export const queryFn = async () => {
  const response = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users",
  );
  return response.data;
};
