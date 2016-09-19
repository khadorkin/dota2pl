import mongoose from 'mongoose';
import debug from 'debug';
const logger = debug('prodota:mongoose:article');
logger.useColors = true;

import BlueBird from 'bluebird';
mongoose.Promise = BlueBird;
const Schema = mongoose.Schema;

import URLSlug from 'mongoose-url-slugs';


const slugify = (t) => t.toString().toLowerCase()
  .replace(/\s+/g, '-')        // Replace spaces with -
  .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
  .replace(/\-\-+/g, '-')      // Replace multiple - with single -
  .replace(/^-+/, '')          // Trim - from start of text
  .replace(/-+$/, '');         // Trim - from end of text

const articleSchema = new Schema({
  _author: { type: Schema.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [Schema.ObjectId], ref: 'User', default: [] },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  date: { type: Date, default: Date.now },
  publishDate: { type: Date, default: Date.now },

});

articleSchema.pre('remove', (next) => {
  next();
});

articleSchema.plugin(URLSlug('title', { field: 'slug' }));

export default mongoose.model('Article', articleSchema);
