import { forwardRef } from "react";
import { useId } from "react";

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, name, type = "text", required = false, error, ...rest }, ref) => {
    const id = useId();

    return (
      <div className="mb-4">
        <label htmlFor={id}>
          {label} {required && <span aria-hidden="true">*</span>}
        </label>
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          ref={ref}
          className={`w-full mt-1 ${error ? "border-rose-300" : ""}`}
          {...rest}
        />
        {error && (
          <p className="text-xs mt-1 text-right text-rose-300">{error}</p>
        )}
      </div>
    );
  },
);

InputField.displayName = "InputField";
