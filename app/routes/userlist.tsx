import { useQuery } from "@tanstack/react-query";
import type { Route } from "./+types/userlist";
import { queryFn } from "~/lib/queryClient";
import UserTable from "~/components/UserTable";
import type { User } from "~/types/user";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "User Dashboard - Wave Health" },
    { name: "description", content: "A list of users" },
  ];
}

export default function UserList() {
  const { isPending, error, data } = useQuery<User[], Error>({
    queryKey: ["userData"],
    queryFn: queryFn,
  });

  if (isPending) return <>Loading...</>;
  if (error) return <>An error has occurred: {error.message}</>;

  return <UserTable users={data} />;
}
