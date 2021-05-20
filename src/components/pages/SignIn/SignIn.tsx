import React from 'react';

import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';

import useTypedSelector from '../../../hooks/useTypedSelector';

// Requests
import { authUser } from '../../assets/requests';

// Types
import { SignUpForm, AuthUser } from './SignIn.types';

// Styled
import classes from './SignIn.module.css';

const SignIn = () => {
  const dispatch = useDispatch();

  const { authError, isAuth } = useTypedSelector((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();

  const onSubmit = (data: any) => {
    const loginData: AuthUser = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    localStorage.setItem('userData', JSON.stringify(loginData));
    dispatch(authUser(loginData));
  };

  return isAuth ? (
    <Redirect to="/" />
  ) : (
    <div className={classes.wrapper}>
      <h3 className={classes.title}>Sign In</h3>
      {authError && <p className={classes.form__text_error}>Such a user does not exist. try again</p>}
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)} action="#">
        <label className={classes.form__label} htmlFor="email">
          Email address
        </label>
        <input
          type="text"
          id="email"
          placeholder="Email address"
          {...register('email', {
            required: true,
            minLength: 3,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          })}
        />
        {errors.email && <p className={classes.form__text_error}>Please enter a valid email</p>}

        <label className={classes.form__label} htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          {...register('password', {
            required: true,
            minLength: 6,
          })}
        />
        {errors.password && (
          <p className={classes.form__text_error}>The password has to be minimum 6 characters long!</p>
        )}

        <input className={classes.form__btn} type="submit" value="Login" />
      </form>
    </div>
  );
};

export default SignIn;
