const Primitive = require('../Primitive')

class Number extends Primitive {
  static parse(value, owner, { property }) {
    if (value == null) { return value }
    if (typeof value !== 'number') {
      throw new Error(`Property ${property.name} has to be a number, received ${value}`)
    }
    return super.parse(value, owner, property)
  }
}

module.exports = Number
  .define({
    name: 'Number'
  })
  .state((State) =>
    State
      .properties({
        min: 'any',
        max: 'any'
      })
      .validators((s) => {
        if (s.min == null) { return }
        if (s.value < s.min) {
          throw new Error(`Min value: ${s.min}`)
        }
      })
      .validators((s) => {
        if (s.max == null) { return }
        if (s.value > s.max) {
          throw new Error(`Max value: ${s.max}`)
        }
      })
  )