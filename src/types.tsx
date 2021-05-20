export type AuthUser = {
  user: {
    email: string;
    password: string;
  };
};

export type UserData = {
  email: string;
  id: number;
  image: string;
  token: string;
  username: string;
};

export type RegisretActionTypes = {
  type: string;
  payload?: {
    user: {
      email: string;
      id: number;
      image: string;
      token: string;
      username: string;
    };
  };
};

export type AuthorizationErrorActionTypes = {
  type: string;
  payload: {
    authError: boolean;
  };
};

export type AuthorizationActionTypes = {
  type: string;
  payload: {
    user: UserData;
  };
};

export type RegistartionErrorActionTypes = {
  type: string;
  payload: {
    regError: boolean;
  };
};

export type LogoutUserActionTypes = {
  type: string;
  payload: {
    isAuth: boolean;
    isRegister: boolean;
    user: {
      email: string;
      id: number;
      image: string;
      token: string;
      username: string;
    };
  };
};

export type EditProfileActionTypes = {
  type: string;
  payload: {
    user: {
      email: string;
      token: string;
      username: string;
      image: string;
    };
  };
};

export type EditProfilePropData = {
  user: {
    bio: string | null;
    email: string;
    id: string;
    image: string;
    token: string;
    username: string;
  };
};

export type EditProfileErrorActionCreator = {
  type: string;
  payload: {
    isEditProfileError: boolean;
  };
};

type Article = {
  title: string;
  slug: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: Array<string>;
  description: string;
  author: {
    username: string;
    bio: string | null;
    image: string;
    following: boolean;
  };
  favorited: boolean;
  favoritesCount: number;
};

export type GetArticles = {
  articles: Array<Article>;
};

export type GetArticlesActionCreator = {
  type: string;
  payload: {
    articles: Array<Article>;
  };
};

export type SingleArticle = {
  article: {
    title: string;
    slug: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    tagList: Array<string>;
    description: string;
    author: {
      username: string;
      bio: string | null;
      image: string;
      following: boolean;
    };
    favorited: boolean;
    favoritesCount: number;
  };
};
export type SingleArticleActionCrator = {
  type: string;
  payload: {
    article: Article;
  };
};

export type AddTagActionCreator = {
  type: string;
  payload: {
    tag: string;
  };
};

export type SendEditArticle = {
  type: string;
  payload: {
    article: {
      title: string;
      slug: string;
      body: string;
      createdAt: string;
      updatedAt: string;
      tagList: Array<string>;
      description: string;
      author: {
        username: string;
        bio: string | null;
        image: string;
        following: boolean;
      };
      favorited: boolean;
      favoritesCount: number;
    };
  };
};

export type SendEditData = {
  article: {
    title: string;
    slug: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    tagList: Array<string>;
    description: string;
    author: {
      username: string;
      bio: string | null;
      image: string;
      following: boolean;
    };
    favorited: boolean;
    favoritesCount: number;
  };
};

export type OnFollowData = {
  article: {
    title: string;
    slug: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    tagList: Array<string>;
    description: string;
    author: {
      username: string;
      bio: string | null;
      image: string;
      following: boolean;
    };
    favorited: boolean;
    favoritesCount: number;
  };
};

export type ActionTypes =
  | SendEditArticle
  | AddTagActionCreator
  | EditProfileActionTypes
  | RegisretActionTypes
  | RegistartionErrorActionTypes
  | AuthorizationActionTypes
  | AuthorizationErrorActionTypes
  | EditProfileErrorActionCreator
  | SingleArticleActionCrator
  | GetArticlesActionCreator
  | LogoutUserActionTypes;
