// noinspection JSUnresolvedVariable
import React, { PropTypes } from 'react'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// noinspection JSUnresolvedVariable
import style from './Header.css';

class Header extends React.Component {
  static propTypes = {
    backgroundImageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    tags: PropTypes.array,


  };


  render() {
    const { backgroundImageUrl, title, author, avatar, date, tags } = this.props;
    return (<div className={style.root}>
      <img className={style.backgroundImage} role="presentation" src={backgroundImageUrl} />
      <div className={style.content}>
        <h1 className={style.title}>{title}</h1>
        <img className={style.avatar}src={avatar} role="presentation" />
        <p className={style.author}>{author}</p>
        <p className={style.date}>{date}</p>
        {tags && <ul className={style.tags}>
          {tags.map(tag => <li>{tag}</li>)}
        </ul>}


      </div>
    </div>);
  }
}

export default withStyles(style)(Header);

