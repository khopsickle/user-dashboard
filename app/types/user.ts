export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite?: string;
    city: string;
    zipcode: string;
  };
  website: string;
  phone: string;
  company: {
    name: string;
  };
};
