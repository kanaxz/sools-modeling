const Number = require('./Number')
const State = require('../../../stating/State')

module.exports = class Degree extends Number {

}
  .define({
    name: 'Degree'
  })
  .state(
    State
      .extends()
      .validators((s) => {
        s.value = s.value % 360
      })
  )