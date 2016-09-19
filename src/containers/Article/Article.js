// noinspection JSUnresolvedVariable
import React, { PropTypes } from 'react'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// noinspection JSUnresolvedVariable
import style from './Article.css';
import Header from './Header';
import Content from './Content';
class Article extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={style.root}>
        <Header
          title={'Nowe rozdanie w dota2.pl'}
          author={'mnick'}
          date={'12 sierpnia nigga'}
          tags={['Daydreamin', 'lupe', 'fiasco']}
          avatar={'https://s-media-cache-ak0.pinimg.com/564x/0a/42/7f/0a427f8c57082a1d1f0da6538acabf32.jpg'}
          backgroundImageUrl={'http://i1-news.softpedia-static.com/images/news2/DOTA-2-The-international-2015-Takes-on-3-8-August-in-Seattle-469276-3.jpg'}
        />
        <Content />

      </div>);
  }
}

export default withStyles(style)(Article);

