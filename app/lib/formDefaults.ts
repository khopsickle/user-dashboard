import type { User } from "~/types/user";
/**
 * emptyFormData Const
 *
 * Default fields for empty form.
 */
export const emptyFormData: User = {
  id: 0,
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
  },
  phone: "",
  company: {
    name: "",
  },
  website: "",
};
