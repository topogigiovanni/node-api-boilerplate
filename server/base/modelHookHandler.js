const APIError = require('../helpers/APIError');

function modelHookHandler(schema) {

  const props = Object.keys(schema.paths);

  const basePropName = {
    active: 'isActive'
  };

  schema.pre('save', function save(next) {
    return next();
  });

  schema.pre('update', function update(next) {
    const self = this;
    let entity = self.getUpdate().$set;

    // console.log('user props=======', props, entity);

    if (!!~props.indexOf(basePropName.active) &&
      !entity.hasOwnProperty(basePropName.active)
    ) {
      self.update({}, {
        $set: {
          [basePropName.active]: false
        }
      });
    }

    return next();
  });

  const publicMethods = {
    withStaticMethods: withStaticMethods
  };

  function withStaticMethods() {

    schema.statics.get = function(id) {
      return this.findById(id)
        .exec()
        .then((el) => {
          if (el) {
            return el;
          }
          const err = new APIError('Element does not exist', httpStatus.NOT_FOUND);
          return Promise.reject(err);
        });
    };

    schema.statics.list = function({
      skip = 0,
      limit = 50
    } = {}) {
      return this.find()
        .sort({
          createdAt: -1
        })
        .skip(+skip)
        .limit(+limit)
        .exec();
    };

    schema.statics.listActives = function({
      skip = 0,
      limit = 50
    } = {}) {
      return this.find({isActive: true})
        .sort({
          createdAt: -1
        })
        .skip(+skip)
        .limit(+limit)
        .exec();
    };

    return publicMethods;
  }

  return publicMethods;
}

module.exports = modelHookHandler;
