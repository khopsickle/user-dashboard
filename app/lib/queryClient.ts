import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

export const queryFn = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users",
  );
  return response.data;
};
