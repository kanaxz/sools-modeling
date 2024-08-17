const mixer = require('sools-core/mixer')
const Abstractable = require('sools-core/mixins/Abstractable')
const Equalable = require('sools-core/mixins/Equalable')
const Any = require('./Any')

module.exports = class Real extends mixer.extends([Any, Abstractable, Equalable]) {

}
  .define({
    name: 'real',
    abstract: true,
  })

