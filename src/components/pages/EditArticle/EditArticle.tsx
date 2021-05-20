import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import useTypedSelector from '../../../hooks/useTypedSelector';

import { addTagAction, addTagErrorAction, removeTagAction } from '../../../redux/actions/actionsCreator';
import { sendEditArticle } from '../../assets/requests';

import classes from './EditArticle.module.css';

import { UseForm, EditData } from './EditArticle.types';

const EditArticle = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UseForm>();

  const { title, slug, body, tagList, description } = useTypedSelector((state) => state.articles.article);
  const { isTagError } = useTypedSelector((state) => state.articles);
  const { token } = useTypedSelector((state) => state.login.user);
  const [tagText, setTagText] = useState('');

  const dispatch = useDispatch();

  const removeTag = (tag: string) => {
    dispatch(removeTagAction(tag));
  };

  const renderTags = tagList.map((tag: string) => {
    const key = tag + new Date().getTime();

    return (
      <div key={key} className={classes.form__tag_wrapper}>
        <input type="text" name={tag} defaultValue={tag} />
        <button onClick={() => removeTag(tag)} className={classes.form__btn_red} type="button">
          Delete
        </button>
      </div>
    );
  });

  const handleTagInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setTagText(value);
  };

  const addTag = (tag: string) => {
    const res = tagList.find((tagItem: string) => tag === tagItem);
    if (res === undefined && tag !== '') {
      dispatch(addTagAction(tag));
      setTagText('');
    } else {
      dispatch(addTagErrorAction());
    }
  };

  const onSubmit = (data: any) => {
    const editData: EditData = {
      article: {
        slug,
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: [...tagList],
      },
      token,
    };

    dispatch(sendEditArticle(editData));
    history.push('/');
  };

  return (
    <div className={classes.wrapper}>
      <h2>Edit article</h2>
      <form action="#" className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.form__label} htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          defaultValue={title}
          {...register('title', { minLength: 6 })}
        />
        {errors.title && <p className={classes.error__text}>Ошибка</p>}

        <label className={classes.form__label} htmlFor="description">
          Short description
        </label>
        <input
          type="text"
          id="description"
          placeholder="Description"
          defaultValue={description}
          {...register('description', { minLength: 6 })}
        />

        <label className={classes.form__label} htmlFor="text">
          Text
        </label>
        <textarea placeholder="text" defaultValue={body} {...register('body', { minLength: 6 })} />

        <label className={classes.form__label} htmlFor="tags">
          Tags
        </label>
        <div className={classes.tags__inner}>
          {renderTags}
          {isTagError && <p className={classes.text__error}>enter the correct value in the field</p>}
          <div className={classes.form__tag_wrapper}>
            <input type="text" name="" placeholder="Tag" onChange={handleTagInput} value={tagText} />
            <button onClick={() => addTag(tagText)} className={classes.form__btn_blue} type="button">
              Add Tag
            </button>
          </div>
          <button className={classes.form__btn_send} type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditArticle;
