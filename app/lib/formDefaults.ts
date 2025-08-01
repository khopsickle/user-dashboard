import type { User } from "~/types/user";

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
