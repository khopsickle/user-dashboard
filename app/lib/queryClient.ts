import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { User } from "~/types/user";

export const queryClient = new QueryClient();

export const queryFn = async () => {
  const response = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users",
  );
  return response.data;
};
