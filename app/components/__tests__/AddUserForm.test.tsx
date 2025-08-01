import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import AddUserForm from "../AddUserForm";

const mockOnAddUser = jest.fn();

const fillAndSubmitForm = async (overrides = {}) => {
  const user = {
    name: "Test User",
    username: "testuser",
    email: "test@example.com",
    phone: "123-456-7890",
    website: "https://example.com",
    company: { name: "Test Co" },
    address: {
      street: "123 Main St",
      suite: "Suite 100",
      city: "Test City",
      zipcode: "12345",
    },
    ...overrides,
  };

  // populate inputs
  await userEvent.type(screen.getByLabelText("Name"), user.name);
  await userEvent.type(screen.getByLabelText("Username"), user.username);
  await userEvent.type(screen.getByLabelText("Email"), user.email);
  await userEvent.type(screen.getByLabelText("Phone"), user.phone);
  await userEvent.type(screen.getByLabelText("Website"), user.website);
  await userEvent.type(
    screen.getByLabelText("Company Name"),
    user.company.name,
  );
  await userEvent.type(screen.getByLabelText("Street"), user.address.street);
  await userEvent.type(screen.getByLabelText("Suite"), user.address.suite);
  await userEvent.type(screen.getByLabelText("City"), user.address.city);
  await userEvent.type(screen.getByLabelText("Zipcode"), user.address.zipcode);

  // submit
  await userEvent.click(screen.getByRole("button", { name: /add user/i }));

  return user;
};

describe("AddUserForm", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockOnAddUser.mockClear();
    render(<AddUserForm onAddUser={mockOnAddUser} />);
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders all input fields", () => {
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Website")).toBeInTheDocument();
    expect(screen.getByLabelText("Company Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Street")).toBeInTheDocument();
    expect(screen.getByLabelText("Suite")).toBeInTheDocument();
    expect(screen.getByLabelText("City")).toBeInTheDocument();
    expect(screen.getByLabelText("Zipcode")).toBeInTheDocument();
  });

  xit("shows validation errors on empty required fields", async () => {
    expect(mockOnAddUser).not.toHaveBeenCalled();
  });

  xit("shows invalid email error", async () => {
    expect(errorMessage).toBeInTheDocument();
    expect(mockOnAddUser).not.toHaveBeenCalled();
  });

  xit("submits form successfully and shows success message", async () => {
    expect(mockOnAddUser).toHaveBeenCalledWith(user);
    expect(screen.getByText(/user added successfully/i)).toBeInTheDocument();

    // success message disappears after 5 seconds

    expect(
      screen.queryByText(/user added successfully/i),
    ).not.toBeInTheDocument();
  });
});
