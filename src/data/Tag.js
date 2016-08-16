import Article from './Article';

const Tag = `
  type Tag {
    name: [String]
    articles: [Article]
  }
  `;

export default () => [Tag, Article];

export const TagResolver = {
  articles() {
    return { name: 'test', articles: [] };
  },
};
