export type SignUpForm = {
  username: string;
  email: RegExp;
  password: string;
  secondPassword: string;
};
export type AuthUser = {
  user: {
    email: string;
    password: string;
  };
};
