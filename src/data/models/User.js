import mongoose from 'mongoose';

import BlueBird from 'bluebird';
mongoose.Promise = BlueBird;
const Schema = mongoose.Schema;

const userSchema = new Schema({

  steamId: {type: String, required: true},
  twitchId: {type: String, default: null},
  userName: {type: String, required: true},
  country: {type: String},
  admin: {type: Boolean, default: false},
  avatarUrl: {
    small: String,
    medium: String,
    big: String
  },
    articles: [{type: Schema.Types.ObjectId, ref: 'Article'}]
})

export default mongoose.model('User', userSchema);
