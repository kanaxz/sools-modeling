const BaseArray = require('sools-core/types/Array')
const mixer = require('sools-core/mixer')
const utils = require('../utils')
const Any = require('./Any')
const Function = require('./Function')
const Template = require('./Template')

const template = Template.of(Any)

const fnArg = { type: Function, args: [template] }

class Array extends mixer.extends(BaseArray, [Any]) {

  static template = template
  static fnArg = fnArg

  constructor(...values) {
    super({}, ...values)
  }

  static parse(object, owner, property) {
    if (!object) {
      return object
    }
    let array
    if (object instanceof this) {
      array = object
    } else {
      array = new this()
      array.push(...object)
    }

    return array
  }

  static equals(a1, a2) {
    if (a1.constructor !== a2.constructor) { return false }
    if (a1.length !== a2.length) { return false }

    const type = this.definition.template
    for (let i = 0; i < a1.length; i++) {
      if (!type.equals(a1[i], a2[i])) {
        return false
      }
    }
    return true
  }

  toJSON(paths, context) {
    const result = [...this].map((object) => {
      return this.constructor.definition.template.toJSON(object, paths, context)
    })
    return result
  }

  destroy() {
    this.splice(0, this.length)
    super.destroy()
  }
}

Array
  .define({
    name: 'array',
    template,
  })
  .methods({
    find: [[fnArg], template],
  })


utils.propertySanitizers.push((property) => {
  if (!Array.isArray(property.type)) { return }
  property.type = Array.of(property.type[0])
})

module.exports = Array

