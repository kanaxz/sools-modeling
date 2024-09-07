const mixer = require('sools-core/mixer')
const Propertiable = require('sools-core/mixins/Propertiable')
const State = require('./State')

module.exports = mixer.mixin([Propertiable], (base) => {
  return class Stateable extends base {
    static stateType = State

    static state(arg) {
      if (arg.prototype instanceof State) {
        this.stateType = arg
      } else {
        this.stateType = arg(this.stateType.extends())
      }
      return this
    }
  }
})
  .define()