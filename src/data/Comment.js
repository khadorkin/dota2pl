import User from './User';

const Comment = `
    type Comment{
        id: String!
        text: String!
        date: String
        author: User
        article: String
        
    }
`;

export default () => [Comment, User];

export const CommentResolver = {
  async author(id) {
    const response = await Models.Comment.populate(id, '_author');
    const { userName, steamId, avatarUrl } = response._author;
    const avatar = avatarUrl.medium;
    return { userName, steamId, avatar };
  },
};
