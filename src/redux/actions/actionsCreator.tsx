import {
  UserData,
  ActionTypes,
  EditProfilePropData,
  GetArticles,
  SingleArticle,
  SendEditData,
  OnFollowData,
} from '../../types';
import {
  AUTHORIZATION,
  AUTHORIZATION_ERROR,
  REGISTRATION,
  REGISTRATION_ERROR,
  LOGOUT,
  EDIT_PROFILE,
  EDIT_PROFILE_ERROR,
  GET_ARTICLES,
  SINGLE_ARTICLES,
  ADD_TAG,
  ADD_TAG_ERROR,
  SEND_EDIT_ARTICLE,
  REMOVE_TAG,
  ON_FOLLOW,
  ON_LOADING,
} from '../actionsType';

export const register = (userData: UserData): ActionTypes => ({
  type: REGISTRATION,
  payload: {
    user: {
      email: userData.email,
      id: userData.id,
      image: userData.image,
      token: userData.token,
      username: userData.username,
    },
  },
});

export const authorization = (userData: UserData): ActionTypes => ({
  type: AUTHORIZATION,
  payload: {
    user: {
      email: userData.email,
      id: userData.id,
      image: userData.image,
      token: userData.token,
      username: userData.username,
    },
  },
});

export const registerError = (data: boolean): ActionTypes => ({
  type: REGISTRATION_ERROR,
  payload: {
    regError: data,
  },
});

export const authError = (data: boolean): ActionTypes => ({
  type: AUTHORIZATION_ERROR,
  payload: {
    authError: data,
  },
});

export const logout = (): ActionTypes => ({
  type: LOGOUT,
  payload: {
    isAuth: false,
    isRegister: false,
    user: {
      email: '',
      id: 0,
      image: '',
      token: '',
      username: '',
    },
  },
});

export const updateProfile = (data: EditProfilePropData): ActionTypes => ({
  type: EDIT_PROFILE,
  payload: {
    user: {
      email: data.user.email,
      token: data.user.token,
      username: data.user.username,
      image: data.user.image,
    },
  },
});

export const editProfileError = (data: boolean): ActionTypes => ({
  type: EDIT_PROFILE_ERROR,
  payload: {
    isEditProfileError: data,
  },
});

export const getArticlesAction = (data: GetArticles): ActionTypes => ({
  type: GET_ARTICLES,
  payload: {
    ...data,
  },
});

export const singleArticleAction = (data: SingleArticle): ActionTypes => ({
  type: SINGLE_ARTICLES,
  payload: {
    ...data,
  },
});

export const addTagAction = (tag: string): ActionTypes => ({
  type: ADD_TAG,
  payload: {
    tag,
  },
});

export const removeTagAction = (tag: string): ActionTypes => ({
  type: REMOVE_TAG,
  payload: {
    tag,
  },
});

export const addTagErrorAction = (): ActionTypes => ({
  type: ADD_TAG_ERROR,
});

export const sendEditArticleAction = (data: SendEditData): ActionTypes => ({
  type: SEND_EDIT_ARTICLE,
  payload: {
    ...data,
  },
});

export const onFollowAction = (data: OnFollowData): ActionTypes => ({
  type: ON_FOLLOW,
  payload: {
    ...data,
  },
});

export const onLoading = (): ActionTypes => ({
  type: ON_LOADING,
});
