import { useForm } from "react-hook-form";
import type { User } from "~/types/user";
import { InputField } from "./InputField";
import { emptyFormData } from "~/lib/formDefaults";

type AddUserFormProps = {
  onAddUser: (user: User) => void;
};

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

  function onSubmit(data: User) {
    onAddUser(data);
    reset(emptyFormData);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-2xl mx-auto my-4 p-8 border rounded"
      noValidate
    >
      <InputField
        label="Name"
        {...register("name", { required: "Name is required" })}
        error={errors.name?.message}
      />

      <InputField
        label="Username"
        {...register("username", { required: "Username is required" })}
        error={errors.username?.message}
      />

      <InputField
        label="Email"
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email format",
          },
        })}
        error={errors.email?.message}
      />

      <fieldset className="space-y-2">
        <legend className="bold">Address</legend>

        <InputField
          label="Street"
          {...register("address.street", { required: "Street is required" })}
          error={errors.address?.street?.message}
        />

        <InputField
          label="Suite"
          {...register("address.suite")}
          error={errors.address?.suite?.message}
        />

        <InputField
          label="City"
          {...register("address.city", { required: "City is required" })}
          error={errors.address?.city?.message}
        />

        <InputField
          label="Zipcode"
          {...register("address.zipcode", {
            required: "Zipcode is required",
          })}
          error={errors.address?.zipcode?.message}
        />
      </fieldset>

      <InputField
        label="Phone"
        type="tel"
        {...register("phone", { required: "Phone is required" })}
        error={errors.phone?.message}
      />

      <InputField
        label="Company Name"
        {...register("company.name", {
          required: "Company name is required",
        })}
        error={errors.company?.name?.message}
      />

      <InputField
        label="Website"
        type="url"
        {...register("website", { required: "Website is required" })}
        error={errors.website?.message}
      />

      <button type="submit" className="mt-4 w-full">
        Add User
      </button>
    </form>
  );
}
