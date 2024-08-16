const mixer = require('../../../../../core/shared/mixer')
const Abstractable = require('../../../../../core/shared/mixins/Abstractable')
const Equalable = require('../../../../../core/shared/mixins/Equalable')
const Any = require('./Any')

module.exports = class Real extends mixer.extends([Any, Abstractable, Equalable]) {

}
  .define({
    name: 'real',
    abstract: true,
  })

