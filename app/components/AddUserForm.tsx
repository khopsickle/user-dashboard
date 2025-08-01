import { useForm } from "react-hook-form";
import type { User } from "~/types/user";
import { InputField } from "./InputField";
import { emptyFormData } from "~/lib/formDefaults";
import getNestedValue from "~/lib/getNestedValue";

type AddUserFormProps = {
  onAddUser: (user: User) => void;
};

type UserFormKeys =
  | "name"
  | "username"
  | "email"
  | "phone"
  | "website"
  | "company.name"
  | "address.street"
  | "address.suite"
  | "address.city"
  | "address.zipcode";

type FieldConfig = {
  key: UserFormKeys;
  label: string;
  type?: string;
  section?: string;
  required?: string;
  pattern?: { value: RegExp; message: string };
};

function getErrorMessage<T>(errors: T, path: string): string | undefined {
  const fieldError = getNestedValue(errors, path);
  if (
    // Check if fieldError is an object, not null, and has a string "message" property.
    typeof fieldError === "object" &&
    fieldError !== null &&
    "message" in fieldError &&
    typeof (fieldError as { message?: unknown }).message === "string"
  ) {
    return String((fieldError as { message: string }).message);
  }
  return undefined;
}

const formFields: FieldConfig[] = [
  { key: "name", label: "Name", required: "Name is required" },
  { key: "username", label: "Username", required: "Username is required" },
  {
    key: "email",
    label: "Email",
    type: "email",
    required: "Email is required",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "Invalid email format",
    },
  },
  { key: "phone", label: "Phone", type: "tel", required: "Phone is required" },
  {
    key: "company.name",
    label: "Company Name",
    required: "Company name is required",
  },
  {
    key: "website",
    label: "Website",
    type: "url",
    required: "Website is required",
  },
  {
    key: "address.street",
    label: "Street",
    section: "Address",
    required: "Street is required",
  },
  {
    key: "address.suite",
    label: "Suite",
    section: "Address",
  },
  {
    key: "address.city",
    label: "City",
    section: "Address",
    required: "City is required",
  },
  {
    key: "address.zipcode",
    label: "Zipcode",
    section: "Address",
    required: "Zipcode is required",
  },
];

export default function AddUserForm({ onAddUser }: AddUserFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: emptyFormData,
    mode: "onSubmit",
  });

  const onSubmit = (data: User) => {
    onAddUser(data);
    reset(emptyFormData);
  };

  const groupedFields = formFields.reduce<Record<string, FieldConfig[]>>(
    (acc, field) => {
      const section = field.section || "_";
      acc[section] ||= [];
      acc[section].push(field);
      return acc;
    },
    {},
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-2xl mx-auto my-4 p-8 border rounded"
      noValidate
    >
      {groupedFields["_"]?.map(
        ({ key, label, type = "text", required, pattern }) => (
          <InputField
            key={key}
            label={label}
            type={type}
            {...register(key, { required, pattern })}
            error={getErrorMessage(errors, key)}
          />
        ),
      )}

      {Object.entries(groupedFields)
        .filter(([section]) => section !== "_")
        .map(([section, fields]) => (
          <fieldset key={section} className="space-y-2">
            <legend className="font-bold">{section}</legend>
            {fields.map(({ key, label, type = "text", required }) => (
              <InputField
                key={key}
                label={label}
                type={type}
                {...register(key, { required })}
                error={getErrorMessage(errors, key)}
              />
            ))}
          </fieldset>
        ))}

      <button type="submit" className="mt-4 w-full">
        Add User
      </button>
    </form>
  );
}
