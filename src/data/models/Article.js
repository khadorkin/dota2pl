import mongoose from 'mongoose';

import BlueBird from 'bluebird';
mongoose.Promise = BlueBird;
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    _author: {type: Schema.ObjectId, ref: 'User'},
    title: {type: String, required: true},
    content: {type: String, required: true},
    tags: {type: [String], default: []},
    date: {type: Date, default: Date.now},
    publishDate: {type: Date, default: Date.now},

})

articleSchema.pre('remove', (next) => {
    "use strict";
    console.log(`called before articleRemoval`);
    next();
})

export default mongoose.model('Article', articleSchema);
