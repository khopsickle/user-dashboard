import { useQuery } from "@tanstack/react-query";
import type { Route } from "./+types/userlist";
import { queryFn } from "~/lib/queryClient";
import type { User } from "~/types/user";
import { LazyUserTable } from "~/components/LazyComponents";
import { Suspense } from "react";
import LoadingFallback from "~/components/LoadingFallback";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "User Dashboard - Wave Health" },
    { name: "description", content: "A list of users" },
  ];
}

export default function UserList() {
  const { isLoading, error, data } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: queryFn,
    staleTime: 15 * 60 * 1000, // 15 mins
  });

  if (isLoading) return <>Loading...</>;
  if (error) return <>An error has occurred: {error.message}</>;
  if (!data || data.length === 0) {
    return <>No users found.</>;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <LazyUserTable users={data} />;
    </Suspense>
  );
}
