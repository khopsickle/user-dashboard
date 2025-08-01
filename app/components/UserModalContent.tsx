import type { User } from "~/types/user";

type UserModalContentProps = {
  user: User;
};
export default function UserModalContent({ user }: UserModalContentProps) {
  return (
    <section aria-labelledby="user-details-heading" className="space-y-4">
      <h2 id="user-details-heading" className="sr-only">
        User Details
      </h2>

      <dl className="space-y-2">
        <div>
          <dt className="font-bold">Name</dt>
          <dd>{user.name}</dd>
        </div>

        <div>
          <dt className="font-bold">User ID</dt>
          <dd>{user.id}</dd>
        </div>

        <div>
          <dt className="font-bold">Username</dt>
          <dd>{user.username}</dd>
        </div>

        <div>
          <dt className="font-bold">Email</dt>
          <dd>{user.email}</dd>
        </div>

        <div>
          <dt className="font-bold">Address</dt>
          <dd>
            {user.address.street}
            <br />
            {user.address.suite}
            <br />
            {user.address.city}, {user.address.zipcode}
          </dd>
        </div>

        <div>
          <dt className="font-bold">Phone #</dt>
          <dd>{user.phone}</dd>
        </div>

        <div>
          <dt className="font-bold">Company Name</dt>
          <dd>{user.company.name}</dd>
        </div>

        <div>
          <dt className="font-bold">Website</dt>
          <dd>
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 underline hover:text-slate-800"
            >
              {user.website}
            </a>
          </dd>
        </div>
      </dl>
    </section>
  );
}
