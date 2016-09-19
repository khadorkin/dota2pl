import { makeExecutableSchema } from 'graphql-tools';


import * as Models from './models';
import User from './User';
import Article, { ArticleResolver, ArticleQueries, ArticleMutations } from './Article';
import Comment, { CommentResolver, CommentQueries, CommentMutations } from './Comment';
import Tag, { TagResolver } from './Tag';


import logger from 'utils/logger';
const log = logger('graphql:schema');


const resolvers = {
  RootMutation: { ...ArticleMutations, ...CommentMutations },
  RootQuery: { ...ArticleQueries, ...CommentQueries },
  Article: ArticleResolver,
  Tag: TagResolver,
  Comment: CommentResolver,
};

const typeDefs = [`
  schema {
    query: RootQuery
    mutation: RootMutation
  }
  type RootMutation{
    createArticle(title: String! content: String! tags: [String]!) : Article
    postComment(article: String! content: String!) : Comment
    editComment(comment: String! content: String!) : Comment

  }
  type RootQuery {
    articles(cursor: String limit: Int = 1 tags: [String] slug: String) : [Article] 
    comments(article: String!, cursor: String, limit: Int = 10): [Comment]
  }
`, Tag, Article, User, Comment];

const mylog = { log: (e) => log.error(e.message) };

const schema = makeExecutableSchema({ typeDefs, resolvers, logger: mylog });


export default schema;
