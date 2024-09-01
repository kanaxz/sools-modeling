const Object = require('./Object')
const { Number } = require('./primitives')

module.exports = class Vector2D extends Object {
  add(arg) {
    if (typeof arg === 'number') {
      return this.add({
        x: arg,
        y: arg
      })
    }

    this.x += arg.x
    this.y += arg.y
    return this
  }

  minus(arg) {  
    this.x -= arg.x
    this.y -= arg.y
    return this
  }
}
  .define({
    name: 'Vector2D',
  })
  .properties({
    x: Number,
    y: Number,
  })