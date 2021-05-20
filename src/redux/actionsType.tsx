enum ActionTypesEnum {
  Registration = 'REGISTRATION',
  RegistrationError = 'REGISTRATION_ERROR',
  Authorization = 'AUTHORIZATION',
  AuthorizationError = 'AUTHORIZATION_ERROR',
  LogoutUser = 'LOGOUT',
  EditProfile = 'EDIT_PROFILE',
  EditProfileError = 'EDIT_PROFILE_ERROR',
  GetArticles = 'GET_ADTICLES',
  SingleArticle = 'SINGLE_ARTICLES',
  AddTag = 'ADD_TAG',
  AddTagError = 'ADD_TAG_ERROR',
  SendEditArticle = 'SEND_EDIT_ARTICLE',
  CreateArticle = 'CREATE_ARTICLE',
  AddTagNewArticle = 'ADD_TAG_NEW_ARTICLE',
  AddTagNewArticleError = 'ADD_TAG_NEW_ARTICLE_ERROR',
  RemoveTag = 'REMOVE_TAG',
  OnFollow = 'ON_FOLLOW',
  OnLoading = 'ON_LOADING',
}

// user reducers

export const REGISTRATION = ActionTypesEnum.Registration;
export const AUTHORIZATION = ActionTypesEnum.Authorization;
export const REGISTRATION_ERROR = ActionTypesEnum.RegistrationError;
export const AUTHORIZATION_ERROR = ActionTypesEnum.AuthorizationError;
export const LOGOUT = ActionTypesEnum.LogoutUser;
export const EDIT_PROFILE = ActionTypesEnum.EditProfile;
export const EDIT_PROFILE_ERROR = ActionTypesEnum.EditProfileError;
export const GET_ARTICLES = ActionTypesEnum.GetArticles;
export const SINGLE_ARTICLES = ActionTypesEnum.SingleArticle;
export const ADD_TAG = ActionTypesEnum.AddTag;
export const ADD_TAG_ERROR = ActionTypesEnum.AddTagError;
export const SEND_EDIT_ARTICLE = ActionTypesEnum.SendEditArticle;
export const CREATE_ARTICLE = ActionTypesEnum.CreateArticle;
export const ADD_TAG_NEW_ARTICLE = ActionTypesEnum.AddTagNewArticle;
export const ADD_TAG_NEW_ARTICLE_ERROR = ActionTypesEnum.AddTagNewArticleError;
export const REMOVE_TAG = ActionTypesEnum.RemoveTag;
export const ON_FOLLOW = ActionTypesEnum.OnFollow;
export const ON_LOADING = ActionTypesEnum.OnLoading;
