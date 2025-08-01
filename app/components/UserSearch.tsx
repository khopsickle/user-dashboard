import { useState } from "react";

// opted for form submission instead of on input change for performance reasons
// could change to on input change and implement debounce to the same effect for better UX

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
        className="px-3 py-2 flex-1"
      />
      <button type="submit">Search</button>
    </form>
  );
}
