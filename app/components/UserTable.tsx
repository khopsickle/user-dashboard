import { useMemo, useState } from "react";
import type { User } from "~/types/user";
import UserTableHeader from "./UserTableHeader";
import { SORTABLE_KEYS, type SortableKeys } from "~/types/sortableKeys";
import UserSearch from "./UserSearch";
import Modal from "./Modal";
import UserModalContent from "./UserModalContent";

type UserTableProps = {
  users: User[];
};

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

function filterUsers(users: User[], query: string): User[] {
  if (!query) return users;

  const lowercaseQuery = query.toLowerCase();

  return users.filter((user) => {
    const searchableFields = [
      user.name,
      user.username,
      user.email,
      user.address.street,
      user.phone,
      user.company.name,
    ];
    return searchableFields.some((field) =>
      field.toLowerCase().includes(lowercaseQuery),
    );
  });
}

export default function UserTable({ users }: UserTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    isAsc: true,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleColumnSort = (key: SortableKeys) => {
    setSortConfig((prevState) => ({
      key,
      isAsc: prevState.key === key ? !prevState.isAsc : true,
    }));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredUsers = useMemo(
    () => filterUsers(users, searchQuery),
    [users, searchQuery],
  );

  const sortedUsers = useMemo(
    () => sortUsers(filteredUsers, sortConfig.key, sortConfig.isAsc),
    [filteredUsers, sortConfig],
  );

  return (
    <main className="p-4 container mx-auto" role="main" aria-label="User directory">
      <UserSearch onSearch={handleSearch} />
      <div className="overflow-x-auto">
        <table className="border-collapse border w-full">
          <thead>
            <tr>
              {SORTABLE_KEYS.map((key) => (
                <UserTableHeader
                  key={key}
                  sortKey={key}
                  handleSort={handleColumnSort}
                  isSorted={sortConfig.key === key}
                  isAsc={sortConfig.isAsc}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedUsers.length === 0 ? (
              <tr>
                <td colSpan={SORTABLE_KEYS.length} className="text-center">
                  <span className="text-rose-500" role="alert">
                    No users found
                  </span>
                </td>
              </tr>
            ) : (
              sortedUsers.map((user) => (
                <tr
                  key={user.id.toString()}
                  onClick={() => setSelectedUser(user)}
                >
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.address.street}</td>
                  <td>{user.phone}</td>
                  <td>{user.company.name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {selectedUser && (
          <Modal heading={selectedUser.name} handleClick={setSelectedUser}>
            <UserModalContent user={selectedUser} />
          </Modal>
        )}
      </div>
    </main>
  );
}
