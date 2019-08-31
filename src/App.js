import React, { Component } from 'react';
import ArticleList from './ArticleList';
import Loader from './Loader';
import ErrorNotification from './ErrorNotification';
// import SearchForm from './SearchForm';
import SearchBox from './SearchBox';
import * as articleAPI from './services/article-api';
/*
 * Функция-помошник, которая возвращает массив объектов
 * такого формата, который ожидает компонент
 */
const mapper = articles => {
  return articles.map(({ objectID: id, url: link, ...props }) => ({
    id,
    link,
    ...props,
  }));
};

export default class App extends Component {
  state = {
    articles: [],
    isLoading: false,
    error: null,
    guery: '',
  };

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = query => {
    this.setState({ isLoading: true });

    articleAPI
      .fetchArticles(query)
      .then(({ data }) => this.setState({ articles: mapper(data.hits) }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));

    // fetch(BASE_URL + DEFAULT_QUERY)
    //   .then(response => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     throw new Error(response.statusText);
    //   })
    //   .then(({ hits }) => {
    //     this.setState({ articles: hits });
    //   })
    //   .catch(console.log);
  };

  handleQueryChange = e => {
    this.setState({ query: e.target.value });
  };

  render() {
    const { articles, isLoading, error, query } = this.state;

    return (
      <div>
        <SearchBox value={query} onChange={this.handleQueryChange} />
        {/* <SearchForm onSubmit={this.fetchArticles} /> */}
        {error && <ErrorNotification text={error.message} />}
        {isLoading && <Loader />}
        {articles.length > 0 && <ArticleList items={articles} />}
      </div>
    );
  }
}
