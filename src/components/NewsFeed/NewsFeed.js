import React, {
  Component,
  PropTypes,
} from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NewsFeed.css';
import Article from '../Article';

import { connect } from 'react-apollo';
import gql from 'graphql-tag';
import Header from '../../containers/Header/Header';


import Transition from 'react-motion-ui-pack';
import { spring, TransitionMotion } from 'react-motion';
import Scrollbars from '../../containers/CustomScrollbar';

const mapQueriesToProps = ({ ownProps, state }) => {
  console.log('Own props:', ownProps);
  return {
    articles: {
      query: gql`
query($start: Int!, $limit: Int!) {
  articles(start: $start, limit: $limit) {
    title,tags,content,date, id, publishDate, author {
      userName
      steamId
    }
  }
}
    `,
      variables: {
        start: 0,
        limit: 5,
      },
    },
  };
};


let ArticleList = ({ articles }) => {
  return (
    <Transition
      component="ul"
      className={s.content}
      enter={{
        opacity: 1,
        translateY: spring(0, { stiffness: 400, damping: 20 }),
      }}
      leave={{
        opacity: 0,
        translateY: 250,
      }}
    >
      {
        articles.map((a, i) => {
          const { content, publishDate, title, tags, id } = a;
          const { userName, steamId } = a.author;
          return (<li key={id} className={s.singleNews}>
            <Article
              active={!i}
              id={id}
              content={content}
              publishDate={publishDate}
              title={title}
              author={userName}
              steamId={steamId}
              tags={tags}
            />
          </li>);
        })
      }
    </Transition>
  );
};


ArticleList = withStyles(s)(ArticleList);


class NewsFeed extends Component {

  getMoreNews = () => {
    console.log('Fetching more!');
    const offset = this.props.articles.articles.length;
    this.props.articles.fetchMore({
      variables: { start: offset },
      updateQuery: (previousResult, { fetchMoreResult, queryVariables }) => {
        const prevEntry = previousResult.articles;
        const moreArticles = fetchMoreResult.data.articles;
        return {
          articles: [...prevEntry, ...moreArticles],
          end: moreArticles.length ? false : true,
        };
      },
    });
  }

  render() {
    const articles = this.props.articles;
    return (
      <Scrollbars className={s.root}>
          <Header />
        {articles.loading && typeof(articles.articles) === 'undefined' ? <div>Ladowanie wpisow</div> : <ArticleList articles={articles.articles} />}
        <div className={s.loadMore} onClick={this.getMoreNews}>Wczytaj więcej</div>
      </Scrollbars>
    );
  }
}

NewsFeed.propTypes = {};
NewsFeed.defaultProps = {
  articles: {
    articles: [],
  },
};

export default connect({ mapQueriesToProps })(withStyles(s)(NewsFeed));
