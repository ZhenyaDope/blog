import { combineReducers } from 'redux';
import articlesReducer from './articlesReducer';
import loginReducer from './loginReducer';

export const rootReducers = combineReducers({ login: loginReducer, articles: articlesReducer });

export type RootState = ReturnType<typeof rootReducers>;
