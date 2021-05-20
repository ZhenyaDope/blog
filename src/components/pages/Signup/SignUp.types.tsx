export type UserData = {
  username: string;
  password: string;
  email: string;
};
export type UseForm = {
  username: string;
  email: RegExp;
  password: string;
  secondPassword: string;
};

export type PasswordValues = {
  password: string | number;
  secondPassword: string | number;
};

export type AuthUser = {
  user: {
    email: string;
    password: string;
  };
};
