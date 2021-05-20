import React, { useEffect } from 'react';

import { Pagination, Spin } from 'antd';

// Redux
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../../hooks/useTypedSelector';

// Components
import Article from '../../Article';

// Styled
import 'antd/dist/antd.css';
import classes from './ArticleList.module.css';
import { getArticles } from '../../assets/requests';
import { onLoading } from '../../../redux/actions/actionsCreator';

type ArticleType = {
  title: string;
  slug: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: Array<string>;
  description: string;
  author: {
    username: string;
    bio: string | null;
    image: string;
    following: boolean;
  };
  favorited: boolean;
  favoritesCount: number;
};

const ArticleList = () => {
  const dispatch = useDispatch();
  const { articles, isLoadingArticleList } = useTypedSelector((state) => state.articles);

  useEffect(() => {
    dispatch(onLoading());
    dispatch(getArticles(5));
  }, [dispatch]);

  const changePage = (page: number) => {
    dispatch(onLoading());
    dispatch(getArticles(5 * page));
  };

  const ArticlesArray = articles.slice(-5).map((article: ArticleType) => {
    const {
      title,
      slug,
      createdAt,
      tagList,
      description,
      author: { username, image },
      favoritesCount,
      favorited,
    } = article;

    return (
      <Article
        key={slug}
        title={title}
        slug={slug}
        createdAt={createdAt}
        tagList={tagList}
        description={description}
        username={username}
        image={image}
        favoritesCount={favoritesCount}
        favorited={favorited}
      />
    );
  });

  return (
    <div className={classes.articleList}>
      {isLoadingArticleList ? (
        <div className={classes.spin_wrapper}>
          <Spin />
        </div>
      ) : (
        <>{ArticlesArray} </>
      )}
      <Pagination onChange={(page) => changePage(page)} defaultPageSize={1} total={12} />
    </div>
  );
};

export default ArticleList;
