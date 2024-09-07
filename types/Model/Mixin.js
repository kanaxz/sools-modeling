const mixer = require('sools-core/mixer')
const Bool = require('../primitives/Bool')
const String = require('../primitives/strings/String')
const This = require('../This')
const Any = require('../Any')
const Indexable = require('../../mixins/Indexable')

module.exports = mixer.mixin([Any, Indexable], (base) => {
  return class ModelMixin extends base { }
})
  .define({
    name: 'modelMixin',
  })
  .indexes({
    id: {
      properties: ['_id'],
      unique: true,
      build: false,
    }
  })
  .properties({
    _id: {
      type: String,
      state: {
        disabled: true,
      }
    },
  })
  .methods({
    eq: [[This], Bool]
  })
  .state((State) =>
    State
      .validators(async (state) => {
        if (!state.filter.length) { return }

        const { value, root, filter } = state
        await value.load()
        const doesMatch = await match(root.context, value, [{ filter }])
        if (!doesMatch) {
          throw new Error('Value is not matching filter')
        }
      })
      .properties({
        filters: {
          default: () => [],
        },
      })
  )