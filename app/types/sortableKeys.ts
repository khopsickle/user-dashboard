export const SORTABLE_KEYS = [
  "name",
  "username",
  "email",
  "address",
  "phone",
  "company",
] as const;

export type SortableKeys = (typeof SORTABLE_KEYS)[number];
