import type { User } from "~/types/user";

type UserTableProps = {
  users: User[];
};

export default function UserTable({ users }: UserTableProps) {
  return (
    <main className="p-4 container mx-auto">
      {users.map((user) => (
        <div id={user.id.toString()}>{user.name}</div>
      ))}
    </main>
  );
}
