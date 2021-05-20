import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

// Routes
import { Redirect } from 'react-router-dom';

// Components
import { Checkbox } from 'antd';

// Redux
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../../hooks/useTypedSelector';

import { createUser } from '../../assets/requests';

// Types
import { UserData, UseForm, PasswordValues, AuthUser } from './SignUp.types';

// Styled
import classes from './SignUp.module.css';

const SignUp = () => {
  const dispatch = useDispatch();

  const { isRegister, regError } = useTypedSelector((state) => state.login);

  const [passwordValues, setPasswordValues] = useState<PasswordValues>({
    password: '',
    secondPassword: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UseForm>();

  const [checkbox, setCheckbox] = useState(false);
  const onSubmit = (data: any) => {
    const userData: UserData = {
      username: data.username,
      password: data.password,
      email: data.email,
    };

    const loginData: AuthUser = {
      user: {
        email: data.email,
        password: data.password,
      },
    };

    dispatch(createUser(userData));
    localStorage.setItem('userData', JSON.stringify(loginData));
  };

  return isRegister ? (
    <Redirect to="/" />
  ) : (
    <div className={classes.wrapper}>
      <h3 className={classes.title}>Create new account</h3>
      {regError && <p className={classes.form__text_error}>This user already exists. Please try again.</p>}
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.form__label} htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          {...register('username', { required: true, minLength: 3, maxLength: 20 })}
        />
        {errors.username && <p className={classes.form__text_error}>Username should be between 3 and 20 characters.</p>}

        <label className={classes.form__label} htmlFor="email">
          Email address
        </label>
        <input
          className={errors.email && classes.error}
          type="text"
          id="email"
          placeholder="Email address"
          {...register('email', {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          })}
        />
        {errors.email ? <p className={classes.form__text_error}>Please enter a valid email</p> : null}

        <label className={classes.form__label} htmlFor="password">
          Password
        </label>
        <input
          className={errors.password && classes.error}
          type="password"
          id="password"
          placeholder="Password"
          {...register('password', { required: true, minLength: 6, maxLength: 40 })}
          onChange={(event) => setPasswordValues((prev) => ({ ...prev, password: event.target.value }))}
        />
        {errors.password && (
          <p className={classes.form__text_error}>The password has to be minimum 6 characters long!</p>
        )}

        <label className={classes.form__label} htmlFor="secondPassword">
          Repeat password
        </label>
        <input
          className={errors.secondPassword && classes.error}
          type="password"
          id="secondPassword"
          placeholder="Repeat password"
          {...register('secondPassword', { required: true, validate: (value) => value === passwordValues.password })}
          onChange={(event) => setPasswordValues((prev) => ({ ...prev, secondPassword: event.target.value }))}
        />
        {errors.password && (
          <p className={classes.form__text_error}>The passwords do not and then retype the password!</p>
        )}
        <hr />
        <div className={classes.form__checkbox_inner}>
          <Checkbox onClick={() => setCheckbox((prev) => !prev)} />
          <p className={classes.form__checkbox_text}>I agree to the processing of my personal information</p>
        </div>
        {checkbox ? (
          <input className={classes.form__btn} type="submit" value="create" />
        ) : (
          <input type="submit" disabled value="create" />
        )}
      </form>
    </div>
  );
};

export default SignUp;
