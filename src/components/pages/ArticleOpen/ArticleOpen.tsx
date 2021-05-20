import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Row, Col, Tag, Spin } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

import avatar from './avatar.png';

// Styled
import classes from './ArticleOpen.module.css';
import useTypedSelector from '../../../hooks/useTypedSelector';
import DeleteModal from '../../DeleteModal';

const ArticleOpen = () => {
  const {
    slug,
    body,
    title,
    favoritesCount,
    tagList,
    description,
    author: { username, image },
    createdAt,
  } = useTypedSelector((state) => state.articles.article);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const spinnerTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(spinnerTimeout);
    };
  }, []);

  const { user } = useTypedSelector((state) => state.login);

  const rednderTags = (tags: Array<string>) => {
    const tagsArray = tags.map((tag: string) => <Tag key={tag}>{tag}</Tag>);
    return tagsArray;
  };

  const createdData = (date: string) => {
    const formatDate = new Date(date);
    return formatDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' });
  };

  const confirmMessage = (): void => {
    setShowModal(true);
  };

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <div className={classes.article}>
          <Row className={classes.article__header} justify="space-between">
            <Col span={18} className={classes.blog}>
              <div className={classes.blog__wrapper}>
                <h2 className={classes.blog__title}>{title}</h2>
                <div className={classes.blog__favorites}>
                  <HeartOutlined />
                  <span className={classes.blog__favorites__count}>{favoritesCount}</span>
                </div>
              </div>
              <div className={classes.blog__tags}>{rednderTags(tagList)}</div>
              <div className={classes.blog__description}>{description}</div>
            </Col>

            <Col span={6} className={classes.user}>
              <div className={classes.user__wrapper}>
                <div className={classes.user__text}>
                  <p className={classes.user__name}>{username}</p>
                  <span className={classes.user__date}>{createdData(createdAt)}</span>
                </div>
                <img className={classes.user__avatar} src={image || avatar} alt="avatar" />
              </div>
              {username === user.username ? (
                <div className={classes.user__btn_group}>
                  <button className={classes.btn__delete} onClick={() => confirmMessage()} type="button">
                    Delete
                  </button>
                  <Link className={classes.btn__edit} to={`/articles/${slug}/edit`}>
                    Edit
                  </Link>
                </div>
              ) : null}
              {showModal && <DeleteModal articleSlug={slug} setShowModal={setShowModal} />}
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className={classes.blog__text}>
                <p>{body}</p>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ArticleOpen;
