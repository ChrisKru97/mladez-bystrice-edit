export type Song = {
  id?: string;
  number?: number;
  name: string;
  text: string;
};

export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};
