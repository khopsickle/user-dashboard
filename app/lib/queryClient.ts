import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { User } from "~/types/user";

/**
 * React Query configuration on top of Axios HTTP request.
 *
 */

// create new instance of QueryClient for React Query
export const queryClient = new QueryClient();

// function that fetches the data from API
export const queryFn = async () => {
  const response = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users",
  );
  // fetched user data
  return response.data;
};
