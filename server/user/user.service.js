const authHelper = require('../helpers/authHelper');
const rollbar = require('../helpers/rollbar');

exports.saveUser = (newUser, req, res, next) => {
  newUser.save((err, user) => {
    if (err){
      if (typeof err === 'object' && err.code === 11000 || err.code === 11001) {
        err.message = req.body.email + ' already use';
      }

      next(err);

      rollbar.log('saveUser Error', err);

      return;
    }

    res.json({
      ok: true,
      valid: true,
      user: user,
      token: authHelper.buildToken(user)
    });
  });
};
