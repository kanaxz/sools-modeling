const Array = require('sools-core/types/Array')
const Propertiable = require('sools-core/mixins/Propertiable')
const mixer = require('sools-core/mixer')
const Bindeable = require('sools-core/mixins/Bindeable')
const setup = require('../setup')
const Validators = require('./Validators')

class BaseState extends mixer.extends([Propertiable, Bindeable]) {

  static define(definition) {
    super.define(definition)
    this.validators = new Validators(this)
    return this
  }

  constructor(values) {
    super()
    Object.assign(this, values)
  }

  reset() {
    this.constructor.properties.forEach((p) => {
      let defaultValue = null
      if (p.default) {
        defaultValue = p.default()
      } else if (p.type.default) {
        defaultValue = p.type.default()
      }

      this[p.name] = defaultValue
    })
  }

  async valueChanged() {
    await this.propertyChanged({
      name: 'value',
    }, this.value)
  }

  set value(value) {
    this.setValue(value)
  }

  async setValue(value) {
    if (this.objectState) {
      await this.objectState.value.set({
        [this.property.name]: value,
      })
    } else {
      this._value = value
      await this.valueChanged()
    }
  }

  get value() {
    if (this.objectState) {
      const parent = this.objectState.value
      return parent && parent[this.property.name]
    } else {
      return this._value
    }
  }

  async validate() {
    const validators = [...this.constructor.validators]

    try {
      for (const validator of validators) {
        const shouldContinue = await validator(this)
        if (shouldContinue === false) { return }
      }
    } catch (err) {
      this.errors.push(err.message)
    }
  }
}

BaseState
  .define()
  .properties({
    disabled: {
      default: () => false,
    },
    required: {
      default: () => false,
    },
    messages: {
      default: () => new Array()
    },
    errors: {
      default: new Array()
    },
  })
  .validators((state) => {
    const { required, value } = state
    if (required && value == null) {
      throw new Error('This field is required')
    }

    return required
  })

module.exports = class State extends mixer.extends(BaseState, setup.state) { }
  .define()
