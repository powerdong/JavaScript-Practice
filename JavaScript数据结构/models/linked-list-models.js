const { Colors } = require('../utils/utils');

class Node {
  constructor (element) {
    this.element = element
    this.next = undefined
  }
}

class TreeNode {
  constructor (key) {
    this.key = key
    this.left = null
    this.right = null
  }
}

class RedBlackNode extends Node {
  constructor(key) {
    super(key)
    this.key = key
    this.color = Colors.RED
  }
  isRed() {
    return this.color === Colors.RED
  }
}

module.exports = {
  Node,
  TreeNode,
  RedBlackNode
}
