export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  website: string;
  phone: string;
  company: {
    name: string;
  };
};
