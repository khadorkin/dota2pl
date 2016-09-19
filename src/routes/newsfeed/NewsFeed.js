import React, {PropTypes} from 'react'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './NewsFeed.css'; //eslint-disable-line

import Article from 'containers/Article';
import ArticleList from 'components/ArticleList'; //eslint-disable-line

class NewsFeed extends React.Component {
  render() {
    return <Article />;
  }
}

export default withStyles(style)(NewsFeed);

