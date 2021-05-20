export type SignUpForm = {
  username: string;
  email: RegExp;
  password: string;
  image: string;
  secondPassword: string;
};

export type FormInputData = {
  username: string;
  email: RegExp;
  password: string;
  image: string;
};

export type EditProfileData = {
  username: string;
  email: RegExp;
  password: string;
  image: string;
  token: string;
};
