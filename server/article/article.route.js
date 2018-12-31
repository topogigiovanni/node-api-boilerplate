const express = require('express');
const validate = require('express-validation');
const ArticleCtrl = require('./article.controller');
const authMiddleware = require('../auth/auth.middleware');
const articleValidation = require('./article.validation');
const articleCtrl = new ArticleCtrl();
const router = express.Router();

// router.use(authMiddleware.hasAuthorization);

router.route('/')
  .get(articleCtrl.listFilter.bind(articleCtrl))
  .post(articleCtrl.create.bind(articleCtrl));

router.route('/filter')
  .post(articleCtrl.listFilter.bind(articleCtrl));

router.route('/actives')
  .get(articleCtrl.listActives.bind(articleCtrl));

router.route('/:articleId')
  .get(articleCtrl.get.bind(articleCtrl))
  .put(articleCtrl.update.bind(articleCtrl))
  .delete(articleCtrl.remove.bind(articleCtrl));

router.param('articleId', articleCtrl.load.bind(articleCtrl));

module.exports = router;
