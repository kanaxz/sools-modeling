const Tree = require('sools-core/types/Tree')

module.exports = class Indexes extends Tree {
  constructor(owner) {
    super()
    this.owner = owner
    owner.definition.parents
      .filter((p) => p.indexes)
      .forEach((parent) => {
        this.push(parent.indexes)
      })
  }

  call(...args) {
    super.call(...args)
    return this.owner
  }

  push(...args) {
    args.forEach((arg) => {
      if (arg instanceof Indexes) {
        super.push(arg)
        return
      }
      if (typeof arg === 'object') {
        Object.entries(arg)
          .forEach(([name, index]) => {
            if (Array.isArray(index)) {
              index = {
                properties: index,
              }
            }
            index.name = name
            index.owner = this.owner
            super.push(index)
          })
        return
      }
      console.error(arg)
      throw new Error('Index type not recognized')
    })
  }
}