const mixer = require('sools-core/mixer')
const Propertiable = require('sools-core/mixins/Propertiable')

const Buildable = require('../mixins/Buildable')
const Templateable = require('../mixins/Templateable')
const Methodable = require('../mixins/Methodable')
const utils = require('../utils')

module.exports = mixer.mixin([Propertiable, Methodable, Buildable, Templateable], (base) => {
  return class Any extends base {
    static getType(type) {
      return this
    }


    static sanitizeProperty(property) {
      utils.propertySanitizers.forEach((sanitizer) => sanitizer(property))
    }
  }
})
  .define({
    name: 'any',
  })
