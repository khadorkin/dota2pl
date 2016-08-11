import {
    makeExecutableSchema,
    addResolveFunctionsToSchema
} from 'graphql-tools';


import * as Models  from './models'

const resolvers = {
  ArticleMutation: {
    async createArticle(root, {title, content, tags}, ctx) {
      "use strict";
      const {user} = ctx;
      console.log(`[GraphQL] createArticle mutation, fetching user from session....`);
      try {
        const User = await Models.User.findById(user._id);
        if (!(User.publisher || User.admin)) {
          throw new Error('Not right access');
        }
        const article = await Models.Article.create({_author: user._id, content, title, tags})
        await User.articles.push(article);
        await User.save();
        return article;

      } catch (e) {
        console.warn(`[GraphQL] ERROR`, e.message);
        return e.message;
      }
      console.log(`GraphQL fetched user: `, User.articles)
    }
  },

  Query: {
    async articles(root, {start, limit}) {
      "use strict";
      const articles = await Models.Article.find().skip(start).limit(limit);
      console.log(start, limit);
      return articles;
    },
    async article(root, {id}) {
      const Article = await Models.Article.findById(id);
      return Article;
      return {title: 'random'}
    }
  },
  Article: {
    tags(id) {
      "use strict";
      return id.tags;
    },
    async author(id) {
      "use strict";
      try {
        const response = await Models.Article.populate(id, '_author');
        // console.log(response._author);
        const {userName, steamId} = response._author
        // console.log(userName,steamId)
        return {userName, steamId};
      } catch (e) {
        console.warn(e.message);
        return e.message;
      }
    }
  },
  Tag: {
    articles(tagName) {
      "use strict";
      return {name: 'test', articles: []}
    }
  }
}

const typeDefs = [`
  schema {
    query: Query
    mutation: ArticleMutation
  }
  
  type User {
  userName: String
  steamId: String
  }
  
  type Article {
    id: String!
    title: String
    date: String
    publishDate: String
    content: String
    tags: [String]
    author: User
  }
  type Tag {
    name: [String]
    articles: [Article]
  }
  
  type ArticleMutation{
    createArticle(
      title: String!
      content: String!
      tags: [String]!
      
    ): Article
  }
  
  type Query {
    article(id: String!): Article
    articles(start: Int = 0, limit: Int = 15): [Article] 
  }
`];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})




export default schema;
