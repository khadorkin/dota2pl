import mongoose from 'mongoose';

import BlueBird from 'bluebird';
mongoose.Promise = BlueBird;
const Schema = mongoose.Schema;

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
  tags: { type: [String], default: [] },
  date: { type: Date, default: Date.now },
  publishDate: { type: Date, default: Date.now },

});

articleSchema.pre('remove', (next) => {
  next();
});

articleSchema.pre('save', (next) => {
  this.slug = slugify(this.title);
  next();
});

export default mongoose.model('Article', articleSchema);
