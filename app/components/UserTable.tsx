import { useMemo, useState } from "react";
import type { User } from "~/types/user";

type UserTableProps = {
  users: User[];
};

type SortableKeys =
  | "name"
  | "username"
  | "email"
  | "address"
  | "phone"
  | "company";

type SortConfig = {
  key: SortableKeys;
  isAsc: boolean;
};

function getNestedValue(user: User, key: SortableKeys): string {
  switch (key) {
    case "address":
      return user.address.street;
    case "company":
      return user.company.name;
    default:
      return user[key];
  }
}

function sortUsers(users: User[], key: SortableKeys, isAsc: boolean = true) {
  return [...users].sort((a, b) => {
    const aValue = getNestedValue(a, key);
    const bValue = getNestedValue(b, key);

    return isAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
  });
}

export default function UserTable({ users }: UserTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    isAsc: true,
  });

  const handleColumnSort = (key: SortableKeys) => {
    setSortConfig((prevState) => ({
      key,
      isAsc: prevState.key === key ? !prevState.isAsc : prevState.isAsc,
    }));
  };

  const handleSort = (key: SortableKeys) => () => handleColumnSort(key);

  const sortedUsers = useMemo(
    () => sortUsers(users, sortConfig.key, sortConfig.isAsc),
    [users, sortConfig],
  );

  return (
    <main className="p-4 container mx-auto">
      <table className="border-collapse border">
        <thead>
          <tr>
            <th onClick={handleSort("name")}>Name</th>
            <th onClick={handleSort("username")}>Username</th>
            <th onClick={handleSort("email")}>Email</th>
            <th onClick={handleSort("address")}>Address</th>
            <th onClick={handleSort("phone")}>Phone</th>
            <th onClick={handleSort("company")}>Company</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id.toString()}>
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
