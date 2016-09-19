import mongoose from 'mongoose';

import BlueBird from 'bluebird';
mongoose.Promise = BlueBird;
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  _author: { type: Schema.ObjectId, ref: 'User' },
  _article: { type: Schema.ObjectId, ref: 'Article' },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },

});

export default mongoose.model('Comment', commentSchema);
