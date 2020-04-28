// 非顺序数据结构是散列表
// 非顺序数据结构——树，它对于存储需要快速查找的数据非常有用

/**
 * 树是一种分层数据的抽象模型。
 * 现实生活中最常见的树的例子是家谱，或是公司的组织架构图
 */

/**
 * 一个树结构包含一系列存在父子关系的节点。每个节点都有一个父节点(除了顶部的第一个节点)以及零个或多个子节点。
 * 
 * 位于树顶部的节点叫作根节点。他没有父节点。树中每个元素都叫作节点。节点分为内部节点和外部节点。至少有一个子节点的节点称为内部节点
 * 没有子元素的节点称为外部节点或叶节点。
 * 
 * 一个节点可以有祖先和后代。一个节点(除了根节点)的祖先包括父节点、祖父节点、曾祖父节点等。一个节点的后代包括子节点、孙子节点、曾孙节点等。
 * 
 * 有关树的另一个术语是子树。子树由节点和它的后代构成
 * 
 * 节点的一个属性是深度，节点的深度取决于它的祖先节点的数量
 * 
 * 树的高度取决于所有节点深度的最大值
 */

/**
 * *: 二叉树中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点
 * 
 * 二叉搜索树是二叉树的一种，但是只允许你在左侧节点存储(比父节点)小的值，在右侧节点存储(比父节点)大的值
 */

const {
  TreeNode,
  RedBlackNode
} = require('./models/linked-list-models');
const {
  Compare,
  defaultCompare,
  BalanceFactor,
  Colors
} = require('./utils/utils')

const Node = TreeNode
/**
 * 创建 BinarySearchTree 类
 * 对于树，使用同样的方式
 */
class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn // 用来比较节点值
    this.root = null // Node 类型的根节点
  }
  /**
   * 向树中插入一个新键
   * @param {String} key 键值
   */
  insert(key) {
    // 验证插入操作是否是特殊情况
    if (this.root == null) {
      // 如果我们尝试插入的树节点是否为第一个节点，如果是，我们创建一个 Node 类的实例并将它赋值给 root
      this.root = new Node(key)
    } else {
      // 将节点添加到根节点之外的其他位置
      this.insertNode(this.root, key)
    }
  }
  /**
   * 将节点添加到根节点以外的其他位置
   * 帮助我们找到新节点应该插入的正确的位置
   * @param {Node} node 树节点
   * @param {String} key 要插入的新值
   */
  insertNode(node, key) {
    // 如果树非空，需要找到插入新节点的位置
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 如果新节点的键小于当前节点的键，需要检查当前节点的左侧子节点
      if (node.left == null) {
        // 如果他没有左侧子节点，就在那里插入新的节点
        node.left = new Node(key)
      } else {
        // 如果有左侧子节点，组要通过递归调用 insertNode 方法继续找到树的下一层
        this.insertNode(node.left, key)
      }
    } else {
      // 如果节点的键比当前节点的键大，同时当前节点没有右侧子节点，就在那里插入新的节点
      if (node.right == null) {
        node.right = new Node(key)
      } else {
        // 如果有右侧子节点，同样需要递归调用 insertNode 方法，但是要用来新节点比较的节点将会是右侧子节点
        this.insertNode(node.right, key)
      }
    }
  }
  /**
   * 中序遍历是一种以上行顺序访问 BST 所有节点的遍历方式，也就是以最小到最大的顺序访问所有节点。
   * *: 中序遍历的一种应用就是对树进行排序操作
   * @param {Function} callback 回调函数用来定义我们对遍历到的每个节点进行的操作
   */
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback)
  }
  /**
   * 回调函数用来定义我们对遍历到的每个节点进行操作
   * @param {Node} node 二叉树
   * @param {Function} callback 回调函数
   */
  inOrderTraverseNode(node, callback) {
    // 首先要检查以参数形式传入的节点是否为 null，这是停止递归继续执行的判断条件，即递归算法的基线条件。
    if (node != null) {
      // 然后调用相同的函数来访问左侧子节点
      this.inOrderTraverseNode(node.left, callback)
      // 接着对根节点进行操作
      callback(node.key)
      // 然后再访问右侧子节点
      this.inOrderTraverseNode(node.right, callback)
    }
  }
  /**
   * 先序遍历是以优先于后代节点的顺序访问每个节点的
   * 应用：打印一个结构化文档
   * @param {Function} callback 回调函数
   */
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback)
  }
  /**
   * 先序遍历会先访问节点本身，然后再访问它的左侧子节点，最后是右侧子节点
   * @param {Node} node 二叉树
   * @param {Function} callback 回调函数
   */
  preOrderTraverseNode(node, callback) {
    if (node != null) {
      callback(node.key)
      this.preOrderTraverseNode(node.left, callback)
      this.preOrderTraverseNode(node.right, callback)
    }
  }
  /**
   * 后序遍历则是先访问节点的后代节点，再访问节点本身。
   * 应用：计算一个目录及其子目录中所有文件所占空间的大小
   * @param {Function} callback 回调函数
   */
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(node, callback)
  }
  /**
   * 后序遍历会先访问左侧子节点，然后是右侧子节点，最后是父节点本身
   * @param {Node} node 二叉树
   * @param {Function} callback 回调函数
   */
  postOrderTraverseNode(node, callback) {
    if (node != null) {
      this.postOrderTraverseNode(node.left, callback)
      this.postOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }
  /**
   * 寻找树的最小键
   */
  searchMinNode() {
    return this.minNode(this.root)
  }
  /**
   * 允许我们从树中任意一个节点开始寻找最小键
   * 使用它来找到一棵树或子树中最小的键
   * @param {Node} node 二叉树
   */
  minNode(node) {
    let current = node
    while (current != null && current.left != null) {
      current = current.left
    }
    return current
  }
  /**
   * 寻找树的最大键
   */
  searchMaxNode() {
    return this.maxNode(this.root)
  }
  /**
   * 要寻找最大键，我们要沿着树的右边进行遍历，直到找到最右端的节点
   * @param {Node} node 二叉树
   */
  maxNode(node) {
    let current = node
    while (current != null && current.right != null) {
      current = current.right
    }
    return current
  }
  /**
   * 搜索一个特定的值
   * @param {String} key 键
   */
  searchOneOfNode(key) {
    return this.searchNode(this.root, key)
  }
  /**
   * 寻找一棵树或其任意子树中的一个特定的值
   * @param {Node} node 二叉树
   * @param {String} key 键
   */
  searchNode(node, key) {
    if (node == null) {
      // 验证传入的 node 是否合法
      return false
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 如果要找的键比当前的节点小，那么继续在左侧的子树上搜索
      return this.searchNode(node.left, key)
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      // 如果要找的键比当前的节点大，那么就从右侧子节点开始继续搜索
      return this.searchNode(node.right, key)
    } else {
      // 否则就说明要找的键和当前节点的键相等，返回 true 来表示找到了这个键
      return true
    }
  }
  /**
   * 移除一个节点
   * @param {String} key 键
   */
  removeOneOfNode(key) {
    this.root = this.removeONode(this.root, key)
  }
  /**
   * 移除一个节点，将新树返回
   * @param {Node} node 二叉树
   * @param {String} key 键
   */
  removeNode(node, key) {
    if (node == null) {
      // 如果正在检测的节点为 null，那么说明键不存在于树中，返回 null
      return null
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 如果要找的键比当前节点的值小，就沿着树的左边找到下一个节点
      node.left = this.removeNode(node.left, key)
      return node
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      // 如果要找的键比当前节点的值大，那么就沿着树的右边找到下一个节点，也就是我们要分析它的子树
      node.right = this.removeNode(node.right, key)
      return node
    } else {
      // 如果我们找到了要找的键 键等于 node.key
      // 第一种情况，移除一个叶节点
      if (node.left == null && node.right == null) {
        // 第一种情况是该节点是一个没有左侧或右侧子节点的叶节点，在这种情况下，我们要做的就是给这个节点赋予 null 值来移除它
        node = null
        return node
      }
      // 第二种情况，移除有一个左侧或右侧子节点的节点，这种情况需要跳过这个节点，直接将父节点指向它的指针指向子节点。
      if (node.left == null) {
        // 如果这个指针没有左侧子节点，也就是说他有一个右侧子节点，因此我们把对他的引用改为对他右侧子节点的引用
        node = node.right
        // 并返回更新后的节点
        return node
      } else if (node.right == null) {
        // 如果这个节点没有右侧子节点，也是一样，把他的引用改为对他左侧子节点的引用并返回更新后的值
        node = node.left
        return node
      }
      // 第三种情况，移除有两个子节点的节点
      // 当找到要移出的节点后，需要找到他右边子树中最小的节点
      const aux = this.minNode(node.right)
      // 然后用它右侧子树中最小节点的键去更新这个节点的值，通过这一步，我们改变了这个节点的键
      node.key = aux.key
      // 继续把右侧子树中的最小节点移除，毕竟他已经被移至要移除的节点的位置
      node.right = this.removeNode(node.right, aux.key)
      // 最后向它的父节点返回更新后节点的引用
      return node
    }
  }
}


const tree = new BinarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(6)

const printNode = value => console.log(value);
tree.inOrderTraverse(printNode) // 3  5  6  7  8  9  10  11  12  13  14  15  18  20  25

/* BST 存在一个问题，取决于你添加的节点数，树的一条边可能会非常深，也就是说，树的一条分支会有很多层，而其他的分支却只有几层 */
/* 有一种树叫做 AVL 树。AVL 树是一种自平衡二叉搜索树，意思是任何一个节点左右两侧子树的高度之差最多为 1 */
/* 添加或移除节点时，AVL 树会尽可能尝试转换为完全树 */

/**
 * 既然 AVL 树是一个 BST，我们可以扩展我们写的 BST 类
 * AVL 树的不同之处在于我们需要校验它的平衡因子，如果有需要，会将其逻辑应用于树的自平衡
 */
class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn)
    this.compareFn = compareFn
    this.root = null
  }
  /**
   * 计算一个节点高度
   * @param {Node} node 二叉树
   */
  getNodeHeight (node) {
    if (node == null) {
      return -1
    }
    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right))
  }
  /**
   * 遵循计算一个节点的平衡因子并返回其值
   * @param {Node} node 二叉树
   */
  getBalanceFactor (node) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      case 2:
        return BalanceFactor.UNBALANCED_LEFT
      default:
        return BalanceFactor.BALANCED
    }
  }
  /**
   * 平衡操作——AVL 旋转
   * 在对 AVL 树添加或移除节点后，我们要计算节点的高度并验证树是否需要进行平衡。
   * 向 AVL 树插入节点时，可以执行单旋转或双旋转两种平衡操作，分别对应四种场景
   * *: 左——左 (LL): 向右的单旋转
   * *: 右——右 (RR): 向左的单旋转
   * *: 左——右 (LR): 向右的双旋转 (先 LL 旋转，再 RR 旋转)
   * *: 右——左 (RL): 向左的右旋转 (先 RR 旋转，再 LL 旋转)
   */
  /**
   * 左——左 旋转
   * 节点的左侧子节点的高度大于右侧子节点的高度时，并且左侧子节点也是平衡或左侧较重
   *      3             2
   *    2             1   3
   *  1
   * @param {Node} node 二叉树
   */
  rotationLL (node) {
    const tmp = node.left
    node.left = tmp.right
    tmp.right = node
    return tmp
  }
  /**
   * 右——右 旋转
   * 出现于右侧子节点的高度大于左侧子节点的高度，并且右侧子节点也是平衡或右侧较重的
   *    1                 2
   *      2             1   3
   *        3
   * @param {Node} node 二叉树
   */
  rotationRR (node) {
    const tmp = node.right
    node.right = tmp.left
    tmp.left = node
    return tmp
  }
  /**
   * 左——右 向右的双旋转
   * 左侧子节点的高度大于右侧子节点的高度，并且左侧子节点右侧较重。
   *          3               3               2
   *        1   c4          2   c4          1   3
   *      c1  2           1   c3          c1 c2c3 c4
   *        c2 c3       c1 c2
   * @param {Node} node 二叉树
   */
  rotationLR (node) {
    // 先做一次 LL 旋转，再做一次 RR 旋转
    node.left = this.rotationRR(node.left)
    return this.rotationLL(node)
  }
  /**
   * 右——左 向左的双旋转
   * 这种情况出现于右侧子节点的高度大于左侧子节点的高度，并且右侧子节点左侧较重。在这种情况下我们可以对右侧子节点进行右旋转来修复
   *        1               1               2
   *      c1 3            c1 2            1   3
   *        2 c4           c2 3         c1 c2c3 c4
   *      c2 c3             c3 c4
   * @param {Node} node 二叉树
   */
  rotationRL (node) {
    // 先做一次 RR 旋转，再做一次 LL 旋转
    node.right = this.rotationLL(node.right)
    return this.rotationRR(node)
  }
  /**
   * 向 AVL 树插入节点和在 BST 中是一样的。除了插入节点外，我们还要验证插入后树是否还是平衡的，如果不是，就要进行必要的旋转操作
   * @param {String} key 新节点
   */
  insertInAVL (key) {
    this.root = this.insertNodeInAVL(this.root, key)
  }
  insertNodeInAVL (node, key) {
    if (node == null) {
      return new Node(key)
    } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key)
    } else {
      // 重复的键
      return node
    }
    // 如果需要，将树进行平衡操作
    const balanceFactor = this.getBalanceFactor(node)
    if (balanceFactor === BalanceFactor,UNBALANCED_LEFT) {
      // 如果在向左侧子树插入节点后树不平衡了，我们需要比较是否插入的键小于左侧子节点的键
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        // 如果是，我们要进行 LL 旋转
        node = this.rotationLL(node)
      } else {
        // 否则，要进行 LR 旋转
        return this.rotationLR(node)
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      // 如果在向右侧子树插入节点后树不平衡了，我们需要比较是否插入的键小于右侧子节点的键
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        // 如果是，我们要进行 RR 旋转
        node = this.rotationRR(node)
      } else {
        // 否则，要进行 RL 旋转
        return this.rotationRL(node)
      }
    }
    return node
  }
  /**
   * 从 AVL 树中移除节点
   * 除了移除节点外，我们还要验证移除后树是否还是平衡的，如果不是，就要进行必要的旋转操作
   * @param {Node} node 二叉树
   * @param {String} key 键
   */
  removeNodeInAVL (node, key) {
    node = super.removeNode(node, key)
    if (node == null) {
      // null 不需要进行平衡
      return node
    }
    // 检测树是否平衡
    const balanceFactor = this.getBalanceFactor(node)
    // 在从 AVL 树中移除节点后，我们需要检查 树是否需要进行平衡，所以使用递归计算以每个移除的节点为根的节点的平衡因子，然后需要对每种情况应用正确的旋转
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      // 如果在从左侧子树移除节点后树不平衡了，我们要计算左侧子树的平衡因子
      const balanceFactorLeft = this.getBalanceFactor(node.left)
      if (balanceFactorLeft === BalanceFactor.BALANCED || balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        // 如果左侧子树向左不平衡，要进行 LL 旋转
        return this.rotationLL(node)
      }
      if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        // 如果左侧子树向右不平衡，要进行 LR 旋转
        return this.rotationLR(node.left)
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      // 如果在从右侧子树移除节点后树不平衡了，我们要计算右侧子树的平衡因子
      const balanceFactorRight = this.getBalanceFactor(node.right)
      if (balanceFactorRight === BalanceFactor.BALANCED || balanceFactorRight === BalanceFactor,SLIGHTLY_UNBALANCED_RIGHT) {
        // 如果右侧子树向右不平衡，要进行 RR 旋转
        return this.rotationRR(node)
      }
      if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        // 如果右侧子树向左不平衡，要进行 LR 旋转
        return this.rotationRL(node.right)
      }
    }
    return node
  }
}

const avlTree = new AVLTree()
avlTree.insert(11)
avlTree.insert(7)
avlTree.insert(15)
avlTree.insert(5)
avlTree.insert(3)
avlTree.insert(9)
avlTree.insert(8)
avlTree.insert(10)
avlTree.insert(13)
avlTree.insert(12)
avlTree.insert(14)
avlTree.insert(20)
avlTree.insert(18)
avlTree.insert(25)
avlTree.insert(6)
console.log('avlTree: ', avlTree);

/**
 * 和 AVL 树一样，红黑树也是一个自平衡二叉搜索树。
 * AVL 树插入和移除节点可能会造成旋转，所以我们需要一个包含多次插入和删除的自平衡树，红黑树是比较好的。
 * 如果插入和删除频率较低，那么 AVL 树比红黑树更好
 */

/**
 * 红黑树中，每个节点都遵循以下规则：
 * *: 顾名思义，每个节点不是红的就是黑的
 * *: 树的根节点是黑的
 * *: 所有叶节点都是黑的(用 NULL 引用表示的节点)
 * *: 如果一个节点是红的，那么它的两个子节点都是黑的
 * *: 不能有两个相邻的红节点，一个红节点不能有红的父节点或子节点
 * *: 从给定的节点到它的后代节点(NULL 叶节点)的所有路径包含相同数量的黑色节点
 */

class RedBlackTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn)
    this.compareFn = compareFn
    this.root = null
  }
  /**
   * 向红黑树中插入节点
   * 除了插入的代码，我们还要在插入后给节点应用一种颜色，并且验证树是否满足红黑树的条件以及是否还是自平衡的
   * @param {String} key 键
   */
  insertInRBT (key) {
    if (this.root == null) {
      // 如果树是空的，那么我们需要创建一个红黑树节点
      this.root = new RedBlackNode(key)
      // 我们将这个根节点的颜色设为黑色
      this.root.color = Colors.BLACK
    } else {
      // 如果树不是空的，我们会像二叉搜索树一样在正确的位置插入节点
      const newNode = this.insertNodeInRBT(this.root, key)
      // 验证规则是否得到满足
      this.fixTreeProperties(newNode)
    }
  }
  insertNodeInRBT (node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new RedBlackTree(key)
        // 我们保存了指向被插入节点的父节点的引用
        node.left.parent = node
        // 并且返回了节点的引用，这样我们在后边验证树的属性
        return node.left
      } else {
        return this.insertNodeInRBT(node.left, key)
      }
    } else if (node.right == null) {
      node.right = new RedBlackNode(key)
      node.right.parent = node
      return node.right
    } else {
      return this.insertNodeInRBT(node.right, key)
    }
  }
  /**
   * 在插入节点后验证红黑树的属性
   * 我们需要使用两个概念：重新填色和旋转
   * @param {Node} node 二叉树
   */
  fixTreeProperties(node) {
    // 从插入节点开始，我们要验证它的父节点是否是红色，以及这个节点是否不是黑色
    while (node && node.parent && node.parent.color === Colors.RED && node.color !== Colors.BLACK) {
      // 为了保证代码的可读性，我们要保存父节点和祖父节点的引用
      let parent = node.parent
      const grandParent = parent.parent
      // 父节点是左侧子节点
      if (grandParent && grandParent.left === parent) {
        const uncle = grandParent.right
        // 叔节点也是红色——只需要重新填色
        if (uncle && uncle.color === Colors.RED) {
          // 由于改变了叔节点的颜色，我们需要一个指向它的引用
          // 如果叔节点的颜色是红色，就改变祖父节点、父节点和叔节点的颜色，并且将当前节点的引用指向祖父节点
          grandParent.color = Colors.RED
          parent.color = Colors.BLACK
          uncle.color = Colors.BLACK
          node = grandParent
        } else {
          // 在节点的叔节点颜色为黑色时，也就是说紧紧重新填色是不够的，树是不平衡的，我们需要进行旋转操作
          // 节点是右侧子节点——左旋转
          if (node === parent.right) {
            // 父节点是祖父节点的左侧子节点，节点是父节点的右侧子节点
            // 首先是右右旋转
            this.rotationRR(parent)
            // 并更新节点
            node = parent
            // 更新父节点
            parent = node.parent
          }
          // 父节点是祖父节点的左侧子节点，节点是父节点的左侧子节点
          // 节点是左侧子节点——右旋转
          // 在第一次旋转后，我们要再次旋转，以祖父节点为基准，并在旋转过程中更新父节点和祖父节点的颜色
          this.rotationLL(grandParent)
          parent.color = Colors.BLACK
          grandParent.color = Colors.RED
          // 最后，我们更新当前节点的引用，以便继续检查树的其他冲突
          node = parent
        }
      } else {
        // 父节点是右侧子节点
        const uncle = grandParent.left
        // 叔节点是红色——只需重新填色
        if (uncle && uncle.color === Colors.RED) {
          grandParent.color = Colors.RED
          parent.color = Colors.BLACK
          uncle.color = Colors.BLACK
          node = grandParent
        } else {
          // 节点是左侧子节点——左旋转
          if (node === parent.left) {
            this.rotationLL(parent)
            node = parent
            parent = node.parent
          }
          // 节点是右侧子节点——左旋转
          this.rotationRR(grandParent)
          parent.color = Colors.BLACK
          grandParent.color = Colors.RED
          node = parent
        }
      }
    }
    // 为了保证根节点的颜色始终是黑色，我们在最后设置根节点的颜色
    this.root.color = Colors.BLACK
  }
  /**
   * 由于我们保存了父节点的引用，需要将引用更新为旋转后的新父节点
   * @param {Node} node 二叉树
   */
  rotationLL(node) {
    const tmp = node.left
    node.left = tmp.right
    if (tmp.right && tmp.right.key) {
      tmp.right.parent = node
    }
    tmp.parent = node.parent
    if (!node.parent) {
      this.root = tmp
    } else {
      if (node === node.parent.left) {
        node.parent.left = tmp
      } else {
        node.parent.right = tmp
      }
    }
    tmp.right = node
    node.parent = tmp
  }
  /**
   * 由于我们保存了父节点的引用，需要将引用更新为旋转后的新父节点
   * @param {Node} node 二叉树
   */
  rotationRR (node) {
    const tmp = node.right
    node.right = tmp.left
    if (tmp.left && tmp.left.key) {
      tmp.left.parent = node
    }
    tmp.parent = node.parent
    if (!node.parent) {
      this.root = tmp
    } else {
      if (node === node.parent.left) {
        node.parent.left = tmp
      } else {
        node.parent.right = tmp
      }
    }
    tmp.left = node
    node.parent = tmp
  }
}

const redBlackNode = new RedBlackTree()
redBlackNode.insertInRBT(1)
redBlackNode.insertInRBT(2)
redBlackNode.insertInRBT(3)
redBlackNode.insertInRBT(5)
redBlackNode.insertInRBT(6)
redBlackNode.insertInRBT(7)
redBlackNode.insertInRBT(9)
redBlackNode.insertInRBT(5)
redBlackNode.insertInRBT(4)
console.log('redBlackNode: ', redBlackNode);