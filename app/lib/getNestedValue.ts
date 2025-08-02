/**
 * getNestedValue Helper
 *
 * Utility function for safely accessing nested object properties using dot notation.
 */
export default function getNestedValue<T>(obj: T, path: string): string {
  return path.split(".").reduce<any>((acc, key) => acc?.[key], obj);
}
