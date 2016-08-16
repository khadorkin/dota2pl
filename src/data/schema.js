import { makeExecutableSchema } from 'graphql-tools';


import * as Models from './models';
import User from './User';
import Article, {ArticleResolver, ArticleQueries, ArticleMutations} from './Article';
import Comment, { CommentResolver } from './Comment'
import Tag, {TagResolver} from './Tag';

const resolvers = {
  RootMutation: {...ArticleMutations},
  RootQuery: {...ArticleQueries},
  Article: ArticleResolver,
  Tag: TagResolver,
};

const typeDefs = [`
  schema {
    query: RootQuery
    mutation: RootMutation
  }
  type RootMutation{
    createArticle(title: String! content: String! tags: [String]!) : Article
  }
  type RootQuery {
    articles(cursor: String limit: Int = 1 tags: [String]) : [Article] 
  }
`, Tag, Article, User];

const schema = makeExecutableSchema({typeDefs,resolvers,});


export default schema;
