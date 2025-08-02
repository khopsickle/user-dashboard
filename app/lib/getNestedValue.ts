/**
 * getNestedValue Helper
 *
 * Utility function for safely accessing nested object properties using dot notation.
 *
 * @param obj - object to extract the value from
 * @param path - path to the nested property (address.city)
 *
 * @returns value at specified path, or undefined if not found
 */
export default function getNestedValue<T>(obj: T, path: string): string {
  return (
    path
      // split dot notation into array of keys: ['user','address', 'city']
      .split(".")
      // reduce goes through the object
      .reduce<any>(
        (acc, key) =>
          // chain into each property, returns undefined if not found
          acc?.[key],
        obj,
      )
  );
}
