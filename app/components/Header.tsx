import { NavLink } from "react-router";

export default function Header() {
  return (
    <nav
      aria-label="Main Navigation"
      className="border-b-1 border-slate-800 dark:border-slate-200"
    >
      <ul className="flex container mx-auto">
        <li className="p-4">
          <NavLink to="/" end>
            User List
          </NavLink>
        </li>
        <li className="p-4">
          <NavLink to="/add">Add User</NavLink>
        </li>
      </ul>
    </nav>
  );
}
