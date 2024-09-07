const Tree = require('sools-core/types/Tree')
const Mixin = require('sools-core/Mixin')

module.exports = class Validators extends Tree {
  constructor(owner) {
    super()
    this.owner = owner
    owner.definition.parents
      .filter((p) => p.validators)
      .forEach((p) => { this.push(p.validators) })
  }

  call(...args) {
    super.call(...args)
    return this.owner
  }

  shouldIterateTree(it, tree) {
    const shouldIterateTree = !(this.owner.prototype instanceof Mixin) || !it.from || !(tree instanceof Validators)
    return shouldIterateTree
  }
}