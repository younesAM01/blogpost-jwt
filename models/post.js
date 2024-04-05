const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    AuthorId: String,
  });

  postModel = mongoose.model('post', postSchema);





  module.exports = postModel