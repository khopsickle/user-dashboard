export const SORTABLE_KEYS = [
  { key: "name", label: "Name" },
  { key: "username", label: "Username" },
  { key: "email", label: "Email" },
  { key: "address.street", label: "Address" },
  { key: "phone", label: "Phone" },
  { key: "company.name", label: "Company" },
] as const;

export type SortableKeys = (typeof SORTABLE_KEYS)[number]["key"];
{}