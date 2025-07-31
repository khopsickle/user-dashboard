import { useState } from "react";
import type { User } from "~/types/user";

type UserTableProps = {
  users: User[];
};

export default function UserTable({ users }: UserTableProps) {
  return (
    <main className="p-4 container mx-auto">
      <table className="border-collapse border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr id={user.id.toString()}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.address.street}</td>
              <td>{user.phone}</td>
              <td>
                {user.company.name} {user.website}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
