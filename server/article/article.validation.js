const Joi = require('joi');
const regexHelper = require('../helpers/regexHelper');

module.exports = {
  // checkAvailability: {
  //   body: {
  //     date: Joi.date().iso().required(),
  //     startTime: Joi.string().regex(regexHelper.hourAndMin).required(), //Joi.string().email({ minDomainAtoms: 2 }),
  //     endTime: Joi.string().regex(regexHelper.hourAndMin).required(),
  //   }
  // }
};
