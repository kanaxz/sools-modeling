
module.exports = {
  Bool: require('./Bool'),
  Primitive: require('./Primitive'),
  ...require('./strings'),
  ...require('./numbers'),
}