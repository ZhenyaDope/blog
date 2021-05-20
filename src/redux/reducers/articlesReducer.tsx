import {
  ADD_TAG,
  GET_ARTICLES,
  SINGLE_ARTICLES,
  ADD_TAG_ERROR,
  SEND_EDIT_ARTICLE,
  CREATE_ARTICLE,
  ADD_TAG_NEW_ARTICLE,
  REMOVE_TAG,
  ON_FOLLOW,
  ON_LOADING,
} from '../actionsType';

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

type InitialState = {
  articles: Array<Article>;
  article: Article;
  isTagError: boolean;
  tagListNewArticle: Array<string>;
  isTagErrorCA: boolean;
  isLoadingArticleList: boolean;
};

type Action = {
  type: string;
  payload?: any;
};

const initialState: InitialState = {
  articles: [
    {
      title: '',
      slug: '',
      body: '',
      createdAt: '',
      updatedAt: '',
      tagList: [],
      description: '',
      author: {
        username: '',
        bio: null,
        image: '',
        following: false,
      },
      favorited: false,
      favoritesCount: 0,
    },
  ],
  article: {
    title: '',
    slug: '',
    body: '',
    createdAt: '',
    updatedAt: '',
    tagList: [],
    description: '',
    author: {
      username: '',
      bio: null,
      image: '',
      following: false,
    },
    favorited: false,
    favoritesCount: 0,
  },
  isTagError: false,
  tagListNewArticle: [],
  isTagErrorCA: false,
  isLoadingArticleList: true,
};

const articlesReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ARTICLES: {
      const { articles } = payload;
      return { ...state, articles, isLoadingArticleList: false };
    }
    case SINGLE_ARTICLES: {
      const { article } = payload;
      return { ...state, article };
    }
    case ADD_TAG: {
      const { tag } = payload;
      const prevTags = [...state.article.tagList];
      return {
        ...state,
        article: {
          ...state.article,
          tagList: [...prevTags, tag],
        },
        isTagError: false,
      };
    }

    case REMOVE_TAG: {
      const { tag } = payload;
      const { tagList } = state.article;
      const idx = state.article.tagList.findIndex((tagItem) => tag === tagItem);
      const left = tagList.slice(0, idx);
      const right = tagList.slice(idx + 1);
      return {
        ...state,
        article: {
          ...state.article,
          tagList: [...left, ...right],
        },
      };
    }
    case ADD_TAG_ERROR: {
      return { ...state, isTagError: true };
    }
    case SEND_EDIT_ARTICLE: {
      return {
        ...state,
        article: {
          ...payload.article,
        },
      };
    }
    case CREATE_ARTICLE: {
      return { ...state };
    }
    case ADD_TAG_NEW_ARTICLE: {
      const { tag } = payload;
      const newTagList = [...state.tagListNewArticle, tag];
      return { ...state, tagListNewArticle: [...newTagList] };
    }

    case ON_FOLLOW: {
      const { article } = payload;
      const idx = state.articles.findIndex((item) => item.slug === article.slug);
      const left = state.articles.slice(0, idx);
      const right = state.articles.slice(idx + 1);

      return {
        ...state,
        articles: [...left, article, ...right],
      };
    }
    case ON_LOADING: {
      return {
        ...state,
        isLoadingArticleList: true,
      };
    }
    default:
      return { ...state };
  }
};

export default articlesReducer;
