const Bool = require('../../../types/primitives/Bool')

module.exports = {
  for: Bool,
  check(value) {
    return typeof value === 'boolean'
  },
}