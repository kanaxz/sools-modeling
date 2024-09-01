const Destroyable = require('sools-core/mixins/Destroyable')
const mixer = require('sools-core/mixer')
const Propertiable = require('sools-core/mixins/Propertiable')
const Equalable = require('sools-core/mixins/Equalable')
const typeKey = '@type'

const ignore = {}

const Buildable = mixer.mixin([Destroyable, Propertiable, Equalable], (base) => {
  return class extends base {

    constructor(values = {}, ...args) {
      super(...args)
      // disable the possibility to assign @type on buildables
      // we don't want to throw an error
      const undefinedValues = this.constructor.properties.reduce((acc, property) => {
        acc[property.name] = undefined
        return acc
      }, {})
      this.set({
        ...undefinedValues,
        ...values,
        '@type': this.constructor.definition.name,
      })
    }


    static parse(object, options, context) {
      if (object == null || object instanceof this) { return object }
      if (object.constructor?.hasMixin && object.constructor.hasMixin(this)) {
        return object
      }
      const typeName = object[typeKey]
      let type = this
      if (typeName && this.definition.name !== typeName) {
        type = this.findChild((c) => c.definition.name === typeName)
        if (!type) {
          throw new Error(`Type ${typeName} not find from ${this.definition.name}`)
        }
      }

      const instance = new type()
      instance.set(object, options)

      return instance
    }

    equals(object) {
      return this.constructor.equals(this, object)
    }

    static toJSON(value, paths, context) {
      return value && value.toJSON(paths, context)
    }

    setPropertyValue(property, value, options) {
      const parsedValue = property.type.parse(value, options, { owner: this, property })
      if (parsedValue === ignore) { return }

      super.setPropertyValue(property, parsedValue)
    }
  }
})

Buildable.ignore = ignore

module.exports = Buildable