export type Song = {
  id?: string;
  number?: number;
  name: string;
  checkRequired: boolean;
  withChords: string;
  withoutChords: string;
};

export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};
