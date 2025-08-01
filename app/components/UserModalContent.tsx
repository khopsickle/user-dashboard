import type { User } from "~/types/user";

type UserModalContentProps = {
  user: User;
};
type UserDetail = { label: string; value: React.ReactNode };

const userDetails = (user: User): UserDetail[] => [
  { label: "Name", value: user.name },
  { label: "User ID", value: user.id.toString() },
  { label: "Username", value: user.username },
  { label: "Email", value: user.email },
  {
    label: "Address",
    value: "",
  },
  { label: "Phone #", value: user.phone },
  { label: "Company Name", value: user.company.name },
  {
    label: "Website",
    value: user.website,
  },
];

const AddressBlock = ({ user }: { user: User }) => {
  const { street, suite, city, zipcode } = user.address;

  return (
    <dd>
      {street && (
        <>
          {street}
          <br />
        </>
      )}
      {suite && (
        <>
          {suite}
          <br />
        </>
      )}
      {(city || zipcode) && (
        <>
          {city}
          {city && zipcode ? ", " : ""}
          {zipcode}
        </>
      )}
    </dd>
  );
};

const WebsiteLink = ({ url }: { url: string }) => {
  const href = /^https?:\/\//i.test(url) ? url : `https://${url}`;
  return (
    <dd>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-600 underline hover:text-slate-800"
      >
        {url}
      </a>
    </dd>
  );
};

export default function UserModalContent({ user }: UserModalContentProps) {
  return (
    <section aria-labelledby="user-details-heading" className="space-y-4">
      <h2 id="user-details-heading" className="sr-only">
        User Details
      </h2>

      <dl className="space-y-2">
        {userDetails(user).map(({ label, value }) => (
          <div key={label}>
            <dt className="font-bold">{label}</dt>
            {label === "Website" ? (
              <WebsiteLink url={value as string} />
            ) : label === "Address" ? (
              <AddressBlock user={user} />
            ) : (
              <dd>{value}</dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}
