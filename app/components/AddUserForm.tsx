import { useForm } from "react-hook-form";
import type { User } from "~/types/user";
import { InputField } from "./InputField";
import { emptyFormData } from "~/lib/formDefaults";
import getNestedValue from "~/lib/getNestedValue";
import { useState } from "react";

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

/**
 * getErrorMessage Helper
 *
 * Extracts error message from react-hook-form errors object, defensively
 *
 * @param errors - errors object from react-hook-form
 * @param path - dot-notation path to the error message
 *
 * @returns string error message or undefined if no error
 *
 * Note: extract into its own helper
 *
 * Future improvement: duplicate user validation? makes more sense if there was a backend
 */

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

/**
 * formFields const
 * Sets up form fields for dynamic rendering of InputFields
 *
 * type: sets the input type (email, tel, url)
 * section: groups related fields together (address fields)
 * required: custom validation message
 * pattern: regex pattern for validation
 */

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

/**
 * AddUserForm Component
 *
 * A form component for adding new users.
 *  - controlled form inputs
 *  - success message on submit
 *  - success message clears itself after 5 sec
 *  - form resets itself after successful submit
 *
 * Validation:
 * - simple validation for required fields
 * - ensures email is in proper format with regEx
 * - detailed error messages
 *
 * Accessibility:
 * - tab navigation through fields
 * - input labels
 *
 * @param props - Component props
 * @param props.onAddUser - callback when user is successfully added
 *  User gets added to the React Query cache of data fetched from
 *  endpoint (see adduser.tsx)
 *
 * @returns JSX element representing the add user form
 *
 * Future improvements:
 * - validate format for phone number, zipcode, etc. fields
 * - return user to the table list to see the added user
 * - increased accessibility features for screen readers
 */

export default function AddUserForm({ onAddUser }: AddUserFormProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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
    setSuccessMessage("User added successfully!");
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  /**
   * groupedFields Helper
   *
   * Reduces flat formFields into sections
   *  Example:
   * {
   *   "_": [name, email, phone],
   *   "Address": [street, city, zipcode]
   * }
   */

  const groupedFields = formFields.reduce<Record<string, FieldConfig[]>>(
    (acc, field) => {
      // fields with '_' are in the default group
      const section = field.section || "_";
      // initialize an array if it doesn't exist
      acc[section] ||= [];
      // add field to its section
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
      {successMessage && (
        <div className="p-2 mb-4 text-emerald-800 bg-emerald-100 border border-emerald-300 rounded">
          {successMessage}
        </div>
      )}

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
