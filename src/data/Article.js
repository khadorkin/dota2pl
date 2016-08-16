import User from './User';
const Article = `type Article {
    id: String!
    title: String
    date: String
    publishDate: String
    content: String
    tags: [String]
    author: User
  }`;

export default () => [Article, User];
import * as Models from './models/index';

export const ArticleResolver = {
  tags(id) {
    return id.tags;
  },
  async author(id) {
    console.log(id);
    try {
      const response = await Models.Article.populate(id, '_author');
            // console.log(response._author);
      const { userName, steamId, avatarUrl } = response._author;
      const avatar = avatarUrl.medium;
            // console.log(userName,steamId)
      return { userName, steamId, avatar };
    } catch (e) {
      console.warn(e.message);
      return e.message;
    }
  },
};

export const ArticleQueries = {
  async articles(root, { cursor, limit, tags }) {
    const queryObject = {};
    cursor && (queryObject.id = { $lt: cursor });
    tags && (queryObject.tags = { $all: tags });
    console.log('Query object:', queryObject);
    const articles = await Models.Article.find(queryObject).sort({ _id: -1 }).limit(limit < 5 ? limit : 5);
    console.log(limit);
    return articles;
  },
};


export const ArticleMutations = {
  async createArticle(root, { title, content, tags }, ctx) {
    const { user } = ctx;
    console.log('[GraphQL] createArticle mutation, fetching user from session....');
    try {
      const userEntity = await Models.User.findById(user._id);
      if (!(userEntity.publisher || userEntity.admin)) {
        throw new Error('Not access');
      }
      const article = await Models.Article.create({ _author: user._id, content, title, tags });
      await userEntity.articles.push(article);
      await userEntity.save();
      return article;
    } catch (e) {
      console.warn('[GraphQL] ERROR', e.message);
      return e.message;
    }
  },
};
