import React from 'react';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';

export default (id, comments = false) => (Component) => {
  'use strict';


  const mapQueriesToProps = ({ ownProps, state }) => ({
    article: {
      query: gql`
query($id: String!) {
  article(id: $id) {
    title,tags,content,date, publishDate, author {
      userName
      steamId
    }
  }
}
    `,
      returnPartialData: true,
      variables: {
        id,
      },
    },
  });


  class ConnectedComponent extends React.Component {

        // render() {
        //   let data = {}
        //   let author = {}
        //
        //   const article = this.props.article;
        //   if(typeof(article) != 'undefined') {
        //     console.log(`Article object`, article);
        //     {author, ...data} = article;
        //   }
        //
        //   return typeof(article) ?  <Component {...data}/> : null };


    render() {
      const { article } = this.props.article;

      if (typeof(article) === 'undefined')
        return null;

      const { author, ...data } = article;

      return (<Component
        single
        active
        comments={comments}
        author={author.userName}
        steamId={author.steamId}
        {...data}
      />);
    }

    }
  return connect({ mapQueriesToProps })(ConnectedComponent);
};

