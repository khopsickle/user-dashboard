import type { Route } from "./+types/adduser";
import type { User } from "~/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import { LazyAddUserForm } from "~/components/LazyComponents";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Add User - Wave Health" },
    { name: "description", content: "Add a user to the list, locally" },
  ];
}

export default function AddUser() {
  const queryClient = useQueryClient();

  function handleAddUser(user: User) {
    console.log("user added", user);
    const users = queryClient.getQueryData<User[]>(["users"]) || [];
    const maxId = users.length ? Math.max(...users.map((u) => u.id)) : 0;
    const newUser = { ...user, id: maxId + 1 };

    queryClient.setQueryData(["users"], [...users, newUser]);
  }
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <LazyAddUserForm onAddUser={handleAddUser} />
    </Suspense>
  );
}
