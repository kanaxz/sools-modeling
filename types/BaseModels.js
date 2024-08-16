const Array = require('./Array')
const setup = require('../setup')
const mixer = require('../../../../../core/shared/mixer')
const Destroyable = require('../../../../../core/shared/mixins/Destroyable')

module.exports = class BaseModels extends mixer.extends(Array, [Destroyable, ...setup.baseModels.before]) {

}
  .define()
