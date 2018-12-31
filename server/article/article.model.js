const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const modelHookHandler = require('../base/modelHookHandler');

/**
 * Schema
 */
const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  body: {
    type: Array,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

ArticleSchema.plugin(mongoosePaginate);

modelHookHandler(ArticleSchema)
  .withStaticMethods();

module.exports = mongoose.model('Article', ArticleSchema);
