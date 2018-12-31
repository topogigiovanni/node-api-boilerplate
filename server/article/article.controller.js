const Article = require('./article.model');
const BaseController = require('../base/controller');

class ArticleController extends BaseController {
  constructor() {
    super('article', Article);
  }
}

module.exports = ArticleController;
