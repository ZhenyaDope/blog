import { Dispatch } from 'react';

import { AuthUser, UserData, ActionTypes } from '../../../types';

import {
  register,
  authorization,
  registerError,
  authError,
  updateProfile,
  editProfileError,
  getArticlesAction,
  singleArticleAction,
  sendEditArticleAction,
  onFollowAction,
} from '../../../redux/actions/actionsCreator';

import { EditProfile, EditData, DataProfile, RegUser, SendEditData, CreateArticleData } from './requests.types';

const API_URL = 'https://conduit.productionready.io/api';

export const createUser = (data: RegUser) => async (dispatch: Dispatch<ActionTypes>) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    const res = await response.json();

    if (res.errors) {
      throw new Error(res.errors);
    }

    const { email, id, image, token, username } = res.user;
    const userData: UserData = {
      email,
      id,
      image,
      token,
      username,
    };
    dispatch(register(userData));
  } catch (error) {
    dispatch(registerError(true));
  }
};

export const authUser = (data: AuthUser) => async (dispatch: Dispatch<ActionTypes>) => {
  const authData: AuthUser = {
    user: {
      email: data.user.email,
      password: data.user.password,
    },
  };
  const jsonUserData = JSON.stringify(authData);
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      body: jsonUserData,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    const res = await response.json();

    if (res.errors) {
      throw new Error('Not valid email or password');
    }

    const { email, id, image, token, username } = res.user;
    const userData: UserData = {
      email,
      id,
      image,
      token,
      username,
    };

    dispatch(authorization(userData));
    dispatch(authError(false));
  } catch (error) {
    dispatch(authError(true));
  }
};

export const editProfile = (data: EditProfile) => async (dispatch: Dispatch<ActionTypes>) => {
  try {
    const editData: EditData = {
      user: {
        email: data.email,
        username: data.username,
        password: data.password,
        image: data.image,
      },
    };

    const response = await fetch(`${API_URL}/user`, {
      method: 'PUT',
      body: JSON.stringify(editData),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${data.token}`,
      },
    });

    const res = await response.json();

    if (res.errors) {
      throw new Error('Error');
    }

    const { bio, email, id, image, token, username } = res.user;
    const dataProfile: DataProfile = {
      user: {
        bio,
        email,
        id,
        image,
        token,
        username,
      },
    };

    dispatch(updateProfile(dataProfile));
    localStorage.setItem(
      'userData',
      JSON.stringify({
        user: {
          email,
          password: data.password,
        },
      }),
    );
  } catch (error) {
    dispatch(editProfileError(true));
  }
};

export const getArticles = (data: number) => async (dispatch: Dispatch<ActionTypes>) => {
  try {
    const response = await fetch(`${API_URL}/articles?limit=${data}`);
    const res = await response.json();

    if (res.errors) {
      throw new Error('Error');
    }

    dispatch(getArticlesAction(res));
  } catch (error) {
    throw new Error(error);
  }
};

export const singleArticle = (data: string) => async (dispatch: Dispatch<ActionTypes>) => {
  try {
    const response = await fetch(`${API_URL}/articles/${data}`);
    const res = await response.json();

    if (res.errors) {
      throw new Error('error');
    }

    dispatch(singleArticleAction(res));
  } catch (error) {
    throw new Error(error);
  }
};

export const sendEditArticle = (data: SendEditData) => async (dispatch: Dispatch<any>) => {
  try {
    const response = await fetch(`${API_URL}/articles/${data.article.slug}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${data.token}}`,
      },
    });
    const res = await response.json();

    if (res.errors) {
      throw new Error('Send error. Try again');
    }

    dispatch(sendEditArticleAction(res));
  } catch (error) {
    throw new Error(error);
  }
};

export const createArticle = async (data: CreateArticleData, token: string) => {
  await fetch(`${API_URL}/articles`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}}`,
    },
  });
};

export const onFollow = (data: string, token: string) => async (dispatch: Dispatch<ActionTypes>) => {
  try {
    const response = await fetch(`${API_URL}/articles/${data}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}}`,
      },
    });
    const res = await response.json();
    dispatch(onFollowAction(res));
  } catch (error) {
    throw new Error(error);
  }
};

export const unFollow = (data: string, token: string) => async (dispatch: Dispatch<ActionTypes>) => {
  try {
    const response = await fetch(`${API_URL}/articles/${data}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}}`,
      },
    });
    const res = await response.json();
    dispatch(onFollowAction(res));
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteArticle = async (data: string, token: string) => {
  try {
    await fetch(`${API_URL}/articles/${data}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}}`,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
