/* @flow */

import React, {
    Component,
    PropTypes,
} from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Article.css';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import Link from '../../containers/Link/Link';
import Transition from 'react-motion-ui-pack';
import { spring, TransitionMotion } from 'react-motion';

// @flow
const qwe : numer = 'asd';

const AnimationWrapper = ({ children }) => <div style={{ flex: '0 0 100%' }}>{children}</div>;


class Article extends Component {
  state = {
    active: false,
  }


  componentDidMount() {
    this.setState({ active: this.props.active });
    moment.locale('pl');
  }


  toggleArticle = () => {
    this.setState({ active: !this.state.active });
  }


  render() {
    const { title, author, content, publishDate, tags, image, id } = this.props;
    const { active } = this.state;
    return (
            <div className={s.root}>
                <div style={{ backgroundImage: `url(${image})` }} className={s.image}>
                    <div className={s.title}>
                        <h1>{title}</h1>
                        <h4>{author}</h4>
                    </div>
                    <ul className={s.tags}>
                        {tags.map((t => (<li key={t}>{t}</li>)))}
                    </ul>
                </div>

                {
                    active &&
                    <div className={s.content} key="really" dangerouslySetInnerHTML={{ __html: content }} />
                }


                <div className={s.infobar}>
                    <div className={s.data}>
                        {moment(publishDate).calendar()}
                    </div>

                    {!this.props.single ? <div className={s.fullArticle}>
                        <Link to={`/article/${id}`}>
                            <RaisedButton label="Przejdź do wpisu"
                              labelColor="white"
                              labelStyle={{ fontWeight: 'bold' }}
                              backgroundColor="rgb(15,18,22)"
                            />
                        </Link>
                    </div> : null}

                </div>

            </div>
        );
  }
}

Article.propTypes = {};
Article.defaultProps = {
  title: 'Błąd, sprawdź konsolę',
  author: 'mnick',
  single: false,
  steamId: '',
  content: 'Błąd',
  publishDate: (new Date() / 1000),
  tags: ['Dota', 'Lan', 'TI6', 'polskascena'],
  image: 'http://hdimagesnew.com/wp-content/uploads/2015/11/1447431275_Railway-Station-Wallpapers-1024x576.jpg',
};

export default withStyles(s)(Article);
