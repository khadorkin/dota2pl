import User from './User';
import Comment from './Comment';
const Article = `type Article {
    id: String!
    title: String
    date: String
    slug: String
    publishDate: String
    content: String
    tags: [String]
    comments: [Comment]
    author: User
  }`;

export default () => [Article, User, Comment];
import * as Models from './models/index';
import logger from 'utils/logger';
const log = logger('graphql:comment');


export const ArticleResolver = {

  async comments(article) {
    log.log('Comment', article);
    try {
      return await Models.Comment.find({ _article: article._id }).limit(10);
    } catch (e) {
      log.warn(e.message);
      return e.message;
    }
  },
  async author(id) {
    try {
      const response = await Models.Article.populate(id, '_author');
      // console.log(response._author);
      const { userName, steamId, avatarUrl } = response._author;
      const avatar = avatarUrl.medium;
      // console.log(userName,steamId)
      return { userName, steamId, avatar };
    } catch (e) {
      log.error(e.message);
      return e.message;
    }
  },
};

export const ArticleQueries = {
  async articles(root, { cursor, limit, tags, slug }) {
    const queryObject = {};
    slug && (queryObject.slug = slug);
    cursor && (queryObject.id = { $lt: cursor });
    tags && (queryObject.tags = { $all: tags });
    log.info('Query object:', queryObject);
    const articles = await Models.Article
      .find(queryObject)
      .sort({ _id: -1 })
      .limit(limit < 5 ? limit : 5);
    log.info(limit);
    return articles;
  },
};


export const ArticleMutations = {
  async createArticle(root, { title, content, tags }, ctx) {
    const { user } = ctx;
    log.info('createArticle mutation, fetching user from session....');
    try {
      const userEntity = await Models.User.findById(user._id);
      if (!(userEntity.publisher || userEntity.admin)) {
        throw new Error('No access to create article');
      }
      const article = await Models.Article.create({ _author: user._id, content, title, tags });
      return article;
    } catch (e) {
      log.warn('Error:', e.message);
      return e.message;
    }
  },
};
