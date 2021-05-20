export type RegUser = {
  username: string;
  email: string;
  password: string;
};

export type EditProfile = {
  username: string;
  email: RegExp;
  password: string;
  image: string;
  token: string;
};

export type DataProfile = {
  user: {
    bio: string | null;
    email: string;
    id: string;
    image: string;
    token: string;
    username: string;
  };
};

export type EditData = {
  user: {
    email: RegExp;
    username: string;
    password: string;
    image: string;
  };
};

export type SendEditData = {
  article: {
    slug: string;
    title: string;
    description: string;
    tagList: Array<string>;
  };
  token: string | number;
};

export type CreateArticleData = {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: Array<string>;
  };
};
