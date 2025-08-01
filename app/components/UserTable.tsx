import { useMemo, useState } from "react";
import type { User } from "~/types/user";
import UserTableHeader from "./UserTableHeader";
import { SORTABLE_KEYS, type SortableKeys } from "~/types/sortableKeys";
import UserSearch from "./UserSearch";
import Modal from "./Modal";
import UserModalContent from "./UserModalContent";
import getNestedValue from "~/lib/getNestedValue";

type UserTableProps = {
  users: User[];
};

type SortConfig = {
  key: SortableKeys;
  isAsc: boolean;
};

function getStringifiedNestedValue<T>(obj: T, path: string): string {
  const value = getNestedValue(obj, path);
  return typeof value === "string" ? value : "";
}

function sortUsers(users: User[], key: SortableKeys, isAsc: boolean = true) {
  return [...users].sort((a, b) => {
    const aValue = getStringifiedNestedValue(a, key);
    const bValue = getStringifiedNestedValue(b, key);

    return isAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
  });
}

function filterUsers(users: User[], query: string): User[] {
  if (!query) return users;

  const lowercaseQuery = query.toLowerCase();

  return users.filter((user) => {
    return SORTABLE_KEYS.some(({ key }) => {
      const value = getStringifiedNestedValue(user, key);
      return value.toLowerCase().includes(lowercaseQuery);
    });
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
    <main
      className="p-4 container mx-auto"
      role="main"
      aria-label="User directory"
    >
      <UserSearch onSearch={handleSearch} />
      <div className="overflow-x-auto">
        <table className="border-collapse border w-full">
          <thead>
            <tr>
              {SORTABLE_KEYS.map(({ key, label }) => (
                <UserTableHeader
                  key={key}
                  label={label}
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
              <>
                {sortedUsers.map((user) => (
                  <tr
                    key={user.id.toString()}
                    onClick={() => setSelectedUser(user)}
                  >
                    {SORTABLE_KEYS.map(({ key }) => (
                      <td key={key}>{getStringifiedNestedValue(user, key)}</td>
                    ))}
                  </tr>
                ))}
              </>
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
