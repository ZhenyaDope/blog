import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useTypedSelector from '../../hooks/useTypedSelector';
import { deleteArticle, getArticles } from '../assets/requests';
import classes from './DeleteModal.module.css';

const DeleteModal = (props: any) => {
  const { articleSlug, setShowModal } = props;
  const { token } = useTypedSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const deliteArticleElement = () => {
    deleteArticle(articleSlug, token);
    dispatch(getArticles(5));
    history.push('/');
  };
  return (
    <div className={classes.wrapper}>
      <p className={classes.text}>Are you sure to delete this article?</p>
      <div className={classes.btn_group}>
        <button type="button" className={classes.btn_gray} onClick={() => setShowModal(false)}>
          No
        </button>
        <button type="button" className={classes.btn_blue} onClick={deliteArticleElement}>
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
