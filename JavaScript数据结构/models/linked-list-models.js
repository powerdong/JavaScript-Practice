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

module.exports = {
  Node,
  TreeNode
}
