import { useCallback } from "react";
import { type SortableKeys } from "~/types/sortableKeys";

type UserTableHeaderProps = {
  sortKey: SortableKeys;
  label: string;
  handleSort: (key: SortableKeys) => void;
  isSorted?: boolean;
  isAsc?: boolean;
};

export default function UserTableHeader({
  handleSort,
  sortKey,
  label,
  isSorted = false,
  isAsc = true,
}: UserTableHeaderProps) {
  const onClick = useCallback(() => handleSort(sortKey), [handleSort, sortKey]);
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSort(sortKey);
      }
    },
    [handleSort, sortKey],
  );
  return (
    <th
      scope="col"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-sort={isSorted ? (isAsc ? "ascending" : "descending") : "none"}
      className="cursor-pointer select-none break-word"
    >
      {label}
    </th>
  );
}
