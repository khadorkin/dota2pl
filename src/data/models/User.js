import mongoose from 'mongoose';

import BlueBird from 'bluebird';
mongoose.Promise = BlueBird;
const Schema = mongoose.Schema;

const userSchema = new Schema({

  steamId: {type: String, required: true},
  userName: {type: String, required: true},
  country: {type: String},
  avatarUrl: {
    small: String,
    medium: String,
    big: String
  },
  mmr: {
    solo: {type: Number, default: null},
    party: {type: Number, default: null},
  }
})

export default mongoose.model('User', userSchema);
