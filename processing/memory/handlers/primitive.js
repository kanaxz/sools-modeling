const Primitive = require('../../../types/primitives/Primitive')

module.exports = {
  for: Primitive,
  methods: {
    eq({ value }, other) {
      return value === other
    },
    neq({ value }, other) {
      return value !== other
    },
  },
  parse(scope, value) {
    return {
      scope,
      value,
    }
  }
}