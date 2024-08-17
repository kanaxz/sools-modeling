const Array = require('./Array')
const setup = require('../setup')
const mixer = require('sools-core/mixer')
const Destroyable = require('sools-core/mixins/Destroyable')

module.exports = class BaseModels extends mixer.extends(Array, [Destroyable, ...setup.baseModels.before]) {

}
  .define()
