// noinspection JSUnresolvedVariable
import React, { PropTypes } from 'react'; //eslint-disable-line
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// noinspection JSUnresolvedVariable
import style from './Content.css';

class Content extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
  };

  static defaultProps = {
    content: 'Id officia fugiat duis tempor adipisicing qui tempor eiusmod cillum irure. Cillum pariatur esse ea id fugiat ad minim est occaecat. Nostrud nostrud nisi amet ut nisi ea et aliquip aute esse ex eiusmod pariatur.\r\nSunt elit enim non duis irure consequat velit eiusmod ex amet. Qui velit ea commodo pariatur sunt amet cillum deserunt do elit anim excepteur laborum reprehenderit. Tempor irure ipsum est magna occaecat sit adipisicing fugiat sit Lorem anim ea quis voluptate.\r\nIpsum mollit dolore voluptate duis. Laboris ex sit laborum nostrud. Voluptate ullamco duis do consequat eiusmod adipisicing. Duis occaecat velit esse dolor. Laboris sunt labore adipisicing occaecat. Dolore et irure sit officia fugiat dolore proident sit et aute consectetur do eiusmod.\r\nReprehenderit occaecat aliqua tempor veniam culpa aliquip adipisicing. Commodo do irure non incididunt. Laborum Lorem esse id occaecat ea ipsum irure veniam ut magna voluptate eiusmod.\r\nNulla culpa exercitation incididunt cillum ut dolor consectetur ad. Proident ut et laboris do qui voluptate dolore excepteur irure commodo excepteur laborum aute. Consequat sit nostrud consequat fugiat deserunt cillum dolor nostrud amet minim in laboris et nostrud. Aliqua amet nostrud pariatur elit occaecat fugiat magna aliqua exercitation sint duis minim deserunt adipisicing. Et occaecat tempor sit elit deserunt sit culpa laborum magna eu excepteur.\r\n'
  }

  render() {
    const { content } = this.props;
    return <div className={style.root}dangerouslySetInnerHTML={{ __html: content }} />;
  }
}

export default withStyles(style)(Content);

