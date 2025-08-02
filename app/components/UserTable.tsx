import { Suspense, useMemo, useState } from "react";
import type { User } from "~/types/user";
import UserTableHeader from "./UserTableHeader";
import { SORTABLE_KEYS, type SortableKeys } from "~/types/sortableKeys";
import UserSearch from "./UserSearch";
import UserModalContent from "./UserModalContent";
import getNestedValue from "~/lib/getNestedValue";
import { LazyModal } from "./LazyComponents";
import LoadingFallback from "./LoadingFallback";

type UserTableProps = {
  users: User[];
};

type SortConfig = {
  key: SortableKeys;
  isAsc: boolean;
};

/**
 * getStringifiedNestedValue Helper
 *
 * Extracts a nested value from an object and converts it to a string
 *
 * @param obj - object to extract the value from
 * @param path - dot-notation path to the value
 *
 * @returns stringified value or empty string if not a string
 *
 * Note: move to its own helper file
 */

function getStringifiedNestedValue<T>(obj: T, path: string): string {
  const value = getNestedValue(obj, path);
  return typeof value === "string" ? value : "";
}

/**
 * sortUsers Helper
 *
 * Sorts array of users by specified key using locale string comparison.
 *  - locale compare returns # value to use with .sort
 *  - accounts for accents, punctuation, and capitalization
 *
 * @param users - array of users to sort
 * @param key - field (dot-notation) to sort by
 * @param isAsc - bool val to destermine sort order (default: true/asc)
 *
 * @returns a new sorted array of users
 */

function sortUsers(users: User[], key: SortableKeys, isAsc: boolean = true) {
  // sort on shallow copy
  return [...users].sort((a, b) => {
    // extract values using dot notation
    const aValue = getStringifiedNestedValue(a, key);
    const bValue = getStringifiedNestedValue(b, key);

    // compare a to b for asc, reverse comparison for desc
    return isAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
  });
}

/**
 * filterUsers Helper
 *
 * Filters based on search query across all data fields.
 *  Case-insensitive.
 *
 * @param users - array of users to filter
 * @param query - search query string
 *
 * @returns filtered array of users matching query
 */

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

/**
 * UserTable Component
 *
 * A comprehensive table component displaying user data.
 *  - Sort by column by clicking column header
 *  - Click row to view full user data
 *  - Horizontal scrolling and responsive breakpoints
 *
 * Searchable:
 *  - Searchable across all user fields on clicking Search
 *  - Displays "no result message"
 *  - Displays all users for empty string
 *
 * Accessibility:
 *  - Tab through table headers
 *  - ARIA labels and keyboard navigation
 *
 * @param props - Component props
 * @param props.users - array of user objects to display in table
 *
 * @returns user table with search and modal as a JSX element
 *
 * Future improvements:
 * - pagination or virtualization for large datasets
 * - expanded keyboard interactions (open modal, arrow keys to sort asc or desc)
 * - more screen reader attrs
 * - on small screens, collapse table columns into single cell - better mobile experience than side scrolling
 * - add highlight to active sort column
 *
 * Note: This component is quite large and could be split out further into a UserTableContainer and UserTable, so that the state management and data manipulation is separated from the rendered form.
 *
 */

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
      // toggle sort direction
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
          <Suspense fallback={<LoadingFallback />}>
            <LazyModal
              heading={selectedUser.name}
              handleClick={setSelectedUser}
            >
              <UserModalContent user={selectedUser} />
            </LazyModal>
          </Suspense>
        )}
      </div>
    </main>
  );
}
