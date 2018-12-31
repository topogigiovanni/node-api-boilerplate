const User = require('./user.model');
const BaseController = require('../base/controller');
const authHelper = require('../helpers/authHelper');
const userService = require('./user.service');

class UserController extends BaseController {

  constructor() {
    super('userId', User);
  }

  create(req, res, next) {
    const newUser = new User({
      ...req.body,
      isAdmin: false,
      isActive: true
    });

    return userService.saveUser(newUser, req, res, next);

    // newUser.save((err, user) => {
    //   console.log('err', err);

    //   if (err){
    //     if (typeof err === 'object' && err.code === 11000 || err.code === 11001) {
    //       err.message = req.body.email + ' already use';
    //     }

    //     next(err);

    //     return;
    //   }

    //   res.json({
    //     ok: true,
    //     valid: true,
    //     user: user,
    //     token: authHelper.buildToken(user)
    //   });
    // });
  }
}

module.exports = UserController;
