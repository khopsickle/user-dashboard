import type { Route } from "./+types/userlist";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "User Dashboard - Wave Health" },
    { name: "description", content: "A list of users" },
  ];
}

export default function UserList() {
  return <>user list page</>;
}
