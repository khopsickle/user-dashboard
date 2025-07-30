import type { Route } from "./+types/adduser";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Add User - Wave Health" },
    { name: "description", content: "Add a user to the list, locally" },
  ];
}

export default function AddUser() {
  return <>add user page</>;
}
