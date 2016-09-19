import User from './User';
import * as Models from './models/index';


import logger from 'utils/logger';
const log = logger('graphql:comment');


const Comment = `
    type Comment{
        id: String!
        content: String!
        date: String
        likes: [User]
        author: User
        article: String    
    }
`;

export default () => [Comment, User];


export const CommentMutations = {
  async postComment(root, { article, content }, ctx) {
    const { user } = ctx;
    log.log(`${user.userName} posting in ${article} with: ${content} `);
    try {
      if (!user) throw new Error({ message: 'No access' });
      const articleFromDatabase = await Models.Article.findOne({ _id: article });
      if (!articleFromDatabase) {
        throw new Error('No matching article found');
      }
      const comment = await Models.Comment
        .create({ _author: user._id, _article: articleFromDatabase._id, content });
      return comment;
    } catch (e) {
      log.error('postCommentError', e.message);
      return e.message;
    }
  },
  async editComment(root, { content }, ctx) {
  },
};

export const CommentQueries = {
  async comments(root, { article, cursor = null, limit }) {
    const queryObject = {
      _article: article,
    };

    cursor && (queryObject._id = { $gt: cursor });
    log.log('Limit: ', limit);
    const comments = await Models.Comment
      .find(queryObject)
      .sort({ _id: 1 })
      .limit(limit < 10 ? limit : 10);

    return comments;
  },
};

export const CommentResolver = {
  async likes(id) {
    const response = await Models.Comment.populate(id, 'likes');
    log.log(response);
    // TODO: Finish implementation of "likes" resolver
    return [{ userName: undefined }];
  },
  async author(id) {
    const response = await Models.Comment.populate(id, '_author');
    const { userName, steamId, avatarUrl } = response._author;
    const avatar = avatarUrl.medium;
    return { userName, steamId, avatar };
  },
};
