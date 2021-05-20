import {
  AUTHORIZATION,
  AUTHORIZATION_ERROR,
  REGISTRATION,
  REGISTRATION_ERROR,
  LOGOUT,
  EDIT_PROFILE,
  EDIT_PROFILE_ERROR,
} from '../actionsType';

type InitialState = {
  isAuth: boolean;
  regError: boolean;
  authError: boolean;
  isRegister: boolean;
  isEditProfileError: boolean;
  user: {
    bio: string;
    id: string;
    token: string;
    username: string;
    image: string;
    email: string;
  };
};

type Action = {
  type: string;
  payload?: any;
};

const initialState: InitialState = {
  isAuth: false,
  regError: false,
  isRegister: false,
  authError: false,
  isEditProfileError: false,
  user: {
    bio: '',
    email: '',
    id: '',
    image: '',
    token: '',
    username: '',
  },
};

const loginReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTRATION: {
      const { user } = payload;
      return { ...state, isRegister: true, isAuth: true, user };
    }
    case REGISTRATION_ERROR: {
      const { regError } = payload;
      return { ...state, regError };
    }
    case AUTHORIZATION: {
      const { user } = payload;
      return { ...state, isRegister: true, isAuth: true, user };
    }
    case AUTHORIZATION_ERROR: {
      const { authError } = payload;
      return { ...state, authError };
    }
    case LOGOUT: {
      const { isAuth, isRegister, user } = payload;
      return { ...state, isAuth, isRegister, user };
    }
    case EDIT_PROFILE: {
      const { user } = payload;
      return { ...state, user };
    }
    case EDIT_PROFILE_ERROR: {
      const { isEditProfileError } = payload;
      return { ...state, isEditProfileError };
    }
    default:
      return state;
  }
};

export default loginReducer;
