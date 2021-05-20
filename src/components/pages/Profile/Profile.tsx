import React from 'react';

import { useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import useTypedSelector from '../../../hooks/useTypedSelector';

import { SignUpForm, FormInputData, EditProfileData } from './Profile.types';
import classes from './Profile.module.css';
import { editProfile } from '../../assets/requests';

const Profile = () => {
  const dispatch = useDispatch();
  const {
    isEditProfileError,
    user: { username, email, image, password, token },
  } = useTypedSelector((state) => state.login);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpForm>();

  const onSubmit = (data: FormInputData) => {
    const editProfileData: EditProfileData = {
      username: data.username,
      email: data.email,
      password: data.password,
      image: data.image,
      token,
    };
    if (editProfileData.image === '') {
      editProfileData.image = image;
    }
    dispatch(editProfile(editProfileData));
  };

  return (
    <div className={classes.profile_wrapper}>
      <h3 className={classes.title}>Edit Profile</h3>
      {isEditProfileError && <p className={classes.text_error}>This email is already registered. Please try again</p>}
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form} action="#">
        <label className={classes.label} htmlFor="username">
          Username
        </label>
        <input
          className={classes.input}
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={username}
          {...register('username', {
            required: true,
          })}
        />
        {errors.username && <p>errors</p>}
        <label className={classes.label} htmlFor="email">
          Email address
        </label>
        <input
          className={classes.input}
          type="text"
          id="email"
          placeholder="email"
          defaultValue={email}
          {...register('email', {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          })}
        />

        <label className={classes.label} htmlFor="password">
          New password
        </label>
        <input
          className={classes.input}
          type="text"
          id="password"
          placeholder="New password"
          defaultValue={password}
          {...register('password', { minLength: 6, maxLength: 40 })}
        />

        <label className={classes.label} htmlFor="Avatar">
          Avatar image (url)
        </label>
        <input
          className={classes.input}
          type="text"
          id="image"
          placeholder="Avatar image"
          defaultValue={image}
          {...register('image')}
        />

        <input className={classes.btn} type="submit" value="Save" />
      </form>
    </div>
  );
};

export default Profile;
