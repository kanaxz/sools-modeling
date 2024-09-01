const State = require('./State')

module.exports = class NumberState extends State {

}
  .define()
  .properties({
    max: 'any',
    min: 'any',
  })