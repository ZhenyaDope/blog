import React, { useEffect } from 'react';

// Router

import { Redirect, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';
// Components
import Header from '../Header';
import ArticleList from '../pages/ArticleList';
import SignUp from '../pages/Signup';
import SignIn from '../pages/SignIn';
import Profile from '../pages/Profile';

//

import { authUser } from '../assets/requests';

// Styled
import classes from './App.module.css';
import ArticleOpen from '../pages/ArticleOpen';
import EditArticle from '../pages/EditArticle';
import CreateArticle from '../pages/CreateArticle';
import useTypedSelector from '../../hooks/useTypedSelector';

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useTypedSelector((state) => state.login);
  useEffect(() => {
    const data: string | null = localStorage.getItem('userData');
    if (data) {
      dispatch(authUser(JSON.parse(data)));
    }
  }, [dispatch]);

  return (
    <div className={classes.App}>
      <Header />
      <div className={classes.content}>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/articles/:slug" component={ArticleOpen} />
        {isAuth && (
          <>
            <Route exact path="/articles/:slug/edit" component={EditArticle} />
            <Route exact path="/create-article" component={CreateArticle} />
          </>
        )}
        <Route exact path="/" component={ArticleList} />
        <Redirect from="*" to="/" />
      </div>
    </div>
  );
};

export default App;
