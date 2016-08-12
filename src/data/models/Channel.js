import mongoose, { Schema } from 'mongoose';

const channelSchema = Schema({
  id: { type: String, unique: true },
  between: Array,
});

export default mongoose.model('Channel', channelSchema);
