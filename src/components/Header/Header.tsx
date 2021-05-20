import React from 'react';

// Components
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'antd';

import { useDispatch } from 'react-redux';

import { logout } from '../../redux/actions/actionsCreator';

// Styled
import classes from './Header.module.css';
import useTypedSelector from '../../hooks/useTypedSelector';

// Assets
import img from './avatar.png';

const Header = () => {
  const {
    user: { username, image },
    isAuth,
  } = useTypedSelector((state) => state.login);

  const history = useHistory();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    localStorage.clear();
    history.push('/');
  };
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.header__link}>
        Realworld Blog
      </Link>
      <div className={classes.header__btnGroup}>
        {!isAuth ? (
          <>
            <Link to="/signin">
              <Button type="default" className={classes.btn}>
                Sign In
              </Button>
            </Link>

            <Link to="/signup">
              <Button type="default" className={classes.btn}>
                Sign Up
              </Button>
            </Link>
          </>
        ) : (
          <div className={classes.user_controls}>
            <Link to="/create-article">
              <Button type="default" className={classes.btn}>
                Create article
              </Button>
            </Link>
            <Link to="/profile" className={classes.username_wrapper}>
              <p className={classes.username}>{username}</p>
              <div className={classes.avatar_wrapper}>
                <img className={classes.avatar} src={image || img} alt="Avatar" />
              </div>
            </Link>
            <Button onClick={onLogout} type="default" className={classes.btn}>
              Log out
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
