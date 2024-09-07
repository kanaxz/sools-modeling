const State = require('./State')
const ArrayAssociation = require('../types/ArrayAssociation')
const ignore = ['_id']

const getState = (context, property) => {
  return (typeof property.state === 'function') ? property.state(context, property) : property.state || {}
}

module.exports = class ObjectState extends State {
  constructor(values) {
    super(values)
    this.on('propertyChanged:value', this.b(this.onValueChanged))
    this.onValueChanged()
  }

  onValueChanged() {
    this.updateStates()
    if (!this.value) { return }
    this.on(this.value, 'propertyChanged', this.b(this.onChildValueChanged))
  }

  reset() {
    super.reset()

    Object.values(this.states).forEach((s) => {
      s.reset()
      const state = getState({ property: this.property }, s.property)
      Object.assign(s, state)
    })
  }

  async onChildValueChanged(property, value) {
    const state = this.states[property.name]
    if (!state) { return }
    await state.valueChanged()
  }

  get currentType() {
    return this.value?.constructor || this.property.type
  }

  updateStates() {
    this.states = this.currentType.properties
      .filter((p) => {
        const shouldIgnore = ignore.indexOf(p.name) !== -1
        if (shouldIgnore) { return false }
        if (p.context === false) { return false }
        if (p.type.prototype instanceof ArrayAssociation) { return false }
        return true
      })
      .reduce((acc, property) => {
        const stateType = property.type.stateType
        acc[property.name] = new stateType({
          objectState: this,
          property,
          root: this.root || this,
        })
        return acc
      }, {})
  }

  async validate() {
    await super.validate()
    for (const state of Object.values(this.states)) {
      await state.validate()
    }
  }

  findFirstStateWithError() {
    for (const state of Object.values(this.states)) {
      if (state.errors.length) { return state }
      if (state.states) {
        const subState = state.findFirstStateWithError()
        if (subState) { return subState }
      }
    }
    return null
  }


}
  .define({
    name: 'ObjectState'
  })

