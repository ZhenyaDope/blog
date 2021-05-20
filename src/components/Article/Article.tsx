import React from 'react';

import { Row, Col, Tag } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import classes from './Article.module.css';

// Assets
import avatar from './avatar.png';
import { onFollow, singleArticle, unFollow } from '../assets/requests';
import useTypedSelector from '../../hooks/useTypedSelector';

type Props = {
  title: string;
  slug: string;
  createdAt: string;

  tagList: Array<string>;
  description: string;
  username: string;

  image: string;

  favoritesCount: number;
  favorited: boolean;
};

const Article = (props: Props) => {
  const dispatch = useDispatch();
  const {
    user: { token },
    isAuth,
  } = useTypedSelector((state) => state.login);

  const { title, slug, createdAt, tagList, description, username, image, favoritesCount, favorited } = props;

  const renderTags = tagList.map((tag: string) => {
    const key = tag + new Date().getTime();
    return <Tag key={key}>{tag}</Tag>;
  });

  const createdData = (date: string) => {
    const formatDate = new Date(date);
    return formatDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' });
  };

  const formatDescription = (text: string) => {
    const formatText = text.length > 100 ? text.slice(0, 100) : text;
    return formatText;
  };

  return (
    <div className={classes.article}>
      <Row className={classes.article__header} justify="space-between">
        <Col span={18} className={classes.blog}>
          <div className={classes.blog__wrapper}>
            <Link
              to={`/articles/${slug}`}
              className={classes.blog__title}
              onClick={() => dispatch(singleArticle(slug))}
            >
              {title}
            </Link>
            <div className={classes.blog__favorites}>
              {isAuth ? (
                <>
                  {' '}
                  {favorited === false ? (
                    <HeartOutlined
                      onClick={() => {
                        dispatch(onFollow(slug, token));
                      }}
                    />
                  ) : (
                    <HeartFilled
                      onClick={() => {
                        dispatch(unFollow(slug, token));
                      }}
                    />
                  )}
                </>
              ) : (
                <HeartOutlined />
              )}

              <span className={classes.blog__favorites__count}>{favoritesCount}</span>
            </div>
          </div>
          <div className={classes.blog__tags}>{renderTags}</div>
          <div className={classes.blog__description}>
            <p>{formatDescription(description)}</p>
          </div>
        </Col>

        <Col span={6} className={classes.user}>
          <div className={classes.user__wrapper}>
            <div className={classes.user__text}>
              <p className={classes.user__name}>{username}</p>
              <span className={classes.user__date}>{createdData(createdAt)}</span>
            </div>
            <img className={classes.user__avatar} src={avatar || image} alt="avatar" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Article;
