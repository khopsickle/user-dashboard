import { useState } from "react";

/**
 * UserSearch Component
 *
 * A search component that allows users to filter user data.
 * Triggers on form submission for performance reasons on large data sets.
 *
 * Accessibility:
 * -  keyboard interactions for input and submit
 *
 * @param props - Component props
 * @param props.onSearch - callback when form is submitted
 *
 * @returns search form with input and submit button as JSX element
 *
 * Future improvements:
 * - add 'clear input' functionality
 * - change search to trigger on input change and
 *   implement debounce for better UX
 */

type UserSearchProps = {
  onSearch: (query: string) => void;
};

export default function UserSearch({ onSearch }: UserSearchProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(input.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Find a user..."
        className="flex-1"
      />
      <button type="submit">Search</button>
    </form>
  );
}
