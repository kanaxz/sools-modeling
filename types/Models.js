const setup = require('../setup')
const mixer = require('sools-core/mixer')
const Destroyable = require('sools-core/mixins/Destroyable')
const BaseModels = require('./BaseModels')

module.exports = class Models extends mixer.extends(BaseModels, [Destroyable, ...setup.models.before]) {

}
  .define()
