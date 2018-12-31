const Rollbar = require('rollbar');
const rollbar = new Rollbar({
  accessToken: 'REPLACE_TO_REAL',
  captureUncaught: true,
  captureUnhandledRejections: true
});


module.exports = rollbar;
