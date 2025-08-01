import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserTable from "../UserTable";
import type { User } from "~/types/user";

jest.mock("../LazyComponents", () => ({
  LazyModal: ({ children, heading, handleClick }: any) => (
    <div data-testid="modal">
      <h2>{heading}</h2>
      <button onClick={() => handleClick(null)}>Close</button>
      {children}
    </div>
  ),
}));

jest.mock("../UserModalContent", () => {
  return function UserModalContent({ user }: { user: User }) {
    return <div data-testid="user-modal-content">User: {user.name}</div>;
  };
});

const mockUsers: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    username: "alicej",
    email: "alice@example.com",
    address: {
      street: "101 Main St",
      city: "Cityville",
      zipcode: "12345",
    },
    website: "alice.com",
    phone: "123-456-7890",
    company: { name: "Alpha Inc" },
  },
  {
    id: 2,
    name: "Bob Smith",
    username: "bobsmith",
    email: "bob@example.com",
    address: {
      street: "202 Oak St",
      city: "Townsville",
      zipcode: "54321",
    },
    website: "bobsmith.io",
    phone: "987-654-3210",
    company: { name: "Beta LLC" },
  },
];

describe("UserTable", () => {
  describe("rendering", () => {
    it("renders all user rows", () => {
      render(<UserTable users={mockUsers} />);
      expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
      expect(screen.getByText("Bob Smith")).toBeInTheDocument();
    });

    it("shows 'No users found' when the list is empty", () => {
      render(<UserTable users={[]} />);
      expect(screen.getByText("No users found")).toBeInTheDocument();
    });
  });

  describe("search", () => {
    it("filters users when searching", async () => {
      render(<UserTable users={mockUsers} />);

      fireEvent.change(screen.getByPlaceholderText("Find a user..."), {
        target: { value: "Alice" },
      });
      fireEvent.click(screen.getByText("Search"));

      await waitFor(() => {
        expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
        expect(screen.queryByText("Bob Smith")).not.toBeInTheDocument();
      });
    });

    it("shows all users when search input is empty", () => {
      render(<UserTable users={mockUsers} />);
      fireEvent.change(screen.getByPlaceholderText("Find a user..."), {
        target: { value: "" },
      });
      fireEvent.click(screen.getByText("Search"));

      expect(screen.getByText("Bob Smith")).toBeInTheDocument();
      expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    });

    it("finds case-insenitive matches", () => {
      render(<UserTable users={mockUsers} />);
      fireEvent.change(screen.getByPlaceholderText("Find a user..."), {
        target: { value: "aLicE" },
      });
      fireEvent.click(screen.getByText("Search"));

      expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
      expect(screen.queryByText("Bob Smith")).not.toBeInTheDocument();
    });
  });

  describe("sorting", () => {
    it("sorts users by column when header is clicked", () => {
      render(<UserTable users={mockUsers} />);

      // asc
      const nameHeader = screen.getByText("Name");
      fireEvent.click(nameHeader);

      const rows = screen.getAllByRole("row");
      expect(rows[2]).toHaveTextContent("Alice Johnson");
      expect(rows[1]).toHaveTextContent("Bob Smith");

      // desc
      fireEvent.click(nameHeader);

      const newRows = screen.getAllByRole("row");
      expect(newRows[2]).toHaveTextContent("Bob Smith");
      expect(newRows[1]).toHaveTextContent("Alice Johnson");
    });

    xit("sorts nested values correctly", () => {
      render(<UserTable users={mockUsers} />);

      // asc
      const cityHeader = screen.getByText("City");
      fireEvent.click(cityHeader);

      const rows = screen.getAllByRole("row");
      expect(rows[1]).toHaveTextContent("Cityville");
      expect(rows[2]).toHaveTextContent("Townsville");

      // desc
      fireEvent.click(cityHeader);

      const rowsDesc = screen.getAllByRole("row");
      expect(rowsDesc[1]).toHaveTextContent("Townsville");
      expect(rowsDesc[2]).toHaveTextContent("Cityville");
    });
  });

  describe("modal", () => {
    xit("opens modal when a user row is clicked", async () => {
      render(<UserTable users={mockUsers} />);
      fireEvent.click(screen.getByText("Alice Johnson"));

      await waitFor(() => {
        expect(screen.getByTestId("modal")).toBeInTheDocument();
        expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
      });
    });

    it("closes modal when close button is clicked", async () => {
      render(<UserTable users={mockUsers} />);
      fireEvent.click(screen.getByText("Bob Smith"));

      await waitFor(() => {
        expect(screen.getByTestId("modal")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText("Close"));

      await waitFor(() => {
        expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
      });
    });

    it("does not render modal when selectedUser is null", () => {
      render(<UserTable users={mockUsers} />);

      expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    });
  });
});
