/**
 * *: 集合：是一种不允许重复的顺序数据结构
 * 集合是由一组无序且唯一(即不能重复)的项组成
 * 在数学中，集合是一组不同对象的集
 * !: 还有一个概念叫空集，空集就是不包括任何元素的集合
 * 可以把集合想像成一个既没有重复元素，也没有顺序概念的数组
 */

/**
 * 创建集合类
 */
class Set {
  constructor () {
    // JavaScript 的对象不允许一个键指向两个不同的属性，也保证了集合里的元素都是唯一的
    this.items = {}
  }
  /**
   * 向集合添加一个新元素
   * @param {any} element 新元素
   */
  add (element) {
    // 检查它是否在于集合中
    if (!this.has(element)) {
      // TODO: 添加一个 element 的时候，把它同时作为键和值保存，因为这样有利于查找该元素
      this.items[element] = element
      return true
    }
    return false
  }
  /**
   * 从集合移除一个元素
   * @param {any} element 要移除的元素
   */
  delete (element) {
    if (this.has(element)) {
      // 如果存在，就从集合中移除 element
      delete this.items[element]
      return true
    }
    return false
  }
  /**
   * 如果元素在集合中，返回 true，否则返回 false
   * 使用 JavaScript 的 in 运算符来验证给定元素是否是 items 对象的属性
   * @param {any} element 要查找的元素
   */
  has (element) {
    // in 运算符返回表示对象在原型链上是否有特定属性的布尔值
    // return element in this.items
    // Object 原型有 hasOwnProperty 方法，该方法返回一个表明对象是否具有特定属性的布尔值
    // !: 如果直接使用 this.items.hasOwnProperty(element) Eslint 会抛出一个错误，错误的原因为不是所有的对象都继承了 Object.prototype
    // !: 甚至继承了 Object.prototype 的对象上的 hasOwnProperty 方法也有可能被覆盖，导致代码不能正常工作
    return Object.prototype.hasOwnProperty.call(this.items, element)
  }
  /**
   * 移除集合中所有元素
   */
  clear () {
    this.items = {}
  }
  /**
   * 返回集合所包含元素的数量
   * 它与数组的 length 属性类似
   */
  size () {
    // Object.keys() 返回一个包含给定对象所有属性的数组
    return Object.keys(this.items).length
  }
  /**
   * 返回一个包含集合中所有值(元素)的数组
   */
  values () {
    return Object.values(this.items)
  }
  /**
   * 并集 A ∪ B
   * 意思就是 x(元素)存在于 A 中，或 x 存在于 B 中
   * *: 实现的 union 不会修改当前的 Set 类实例或是作为参数传入 otherSet
   * TODO: 没有副作用的方法和函数被称为纯函数。纯函数不会修改当前的实例或参数，只会生成一个新的结果
   * @param {Set} otherSet 另一个集合
   */
  union (otherSet) {
    // 首先创建一个新的集合，代表两个集合的并集
    const unionSet = new Set()
    // 获取第一个集合的所有值，迭代并全部添加到代表并集的集合中
    this.values().forEach(value => unionSet.add(value))
    // 对第二个集合做同样的事
    otherSet.values().forEach(value => unionSet.add(value))
    // 返回结果
    return unionSet
  }
  /**
   * 交集
   * A ∩ B
   * x(元素)存在于 A 中，且 x 存在于 B 中
   * @param {Set} otherSet 另一个集合
   */
  intersection (otherSet) {
    // 创建一个新的 Set 实例，这样就能用它来返回共有的元素
    const intersectionSet = new Set()
    const values = this.values()
    const otherValues = otherSet.values()
    let biggerSet = values
    let smallerSet = otherValues
    // 比较两个集合中的元素个数
    if (otherValues.length - values.length > 0) {
      biggerSet = otherValues
      smallerSet = values
    }
    // 迭代当前 Set 实例所有的值，验证他们是否存在于 otherSet 实例中
    smallerSet.forEach(value => {
      if (biggerSet.includes(value)) {
        intersectionSet.add(value)
      }
    })
    // 返回结果
    return intersectionSet
  }
  /**
   * 差集
   * A - B
   * x(元素) 存在于 A 中，且 x 不存在于 B 中
   * @param {Set} otherSet 另一个集合
   */
  difference (otherSet) {
    // 首先要创建结果集合，因为我们不想修改原来的集合
    const differenceSet = new Set()
    // 迭代集合中的所有值，我们会检查当前值(元素)是否存在于给定集合中
    this.values().forEach(value => {
      if (!otherSet.has(value)) {
        // 如果不存在 otherSet 中,则将此值加入结果集合中
        differenceSet.add(value)
      }
    })
    return differenceSet
  }
  /**
   * 子集
   * A ∈ B
   * 集合 A 中的每一个 x(元素)，也需要存在于集合 B 中
   * @param {Set} otherSet 另一个集合
   */
  isSubsetOf (otherSet) {
    // 首先验证的是当前 Set 实例的大小
    if (this.size() > otherSet.size()) {
      // 如果当前实例中的元素比 otherSet 实例更多，它就不是一个子集
      // !: 子集的元素个数需要小于或等于要比较的集合
      return false
    }
    // 假定当前实例是给定集合的子集
    let isSubset = true
    // 迭代当前集合的所有元素
    this.values().every(value => {
      // 验证这些元素也存在于 otherSet 中
      if (!otherSet.has(value)) {
        // 如果有任何元素不存在于 otherSet 中，就意味着它不是一个子集，返回 false
        isSubset = false
        return false
      }
      // 如果所有元素都存在于 otherSet 中，返回 true
      return true
    })
    return isSubset
  }
}

const set = new Set()

set.add(1)
console.log('set.values(): ', set.values()) // [1]
console.log('set.has(1): ', set.has(1)) // true
console.log('set.size(): ', set.size()) // 1

set.add(2)
console.log('set.values(): ', set.values()) // [1, 2]
console.log('set.has(2): ', set.has(2)) // true
console.log('set.size(): ', set.size()) // 2

set.delete(1)
console.log('set.values(): ', set.values()) // [2]

set.delete(2)
console.log('set.values(): ', set.values()) // []

// TODO: 使用 ES2015 Set 类================================================
const setEs = new Set()
console.log('setEs.add(1): ', setEs.add(1))
console.log('setEs.values(): ', setEs.values())
console.log('setEs.has(1): ', setEs.has(1))
console.log('setEs.size: ', setEs.size) // Set 有一个 size 属性
console.log('setEs.delete(1): ', setEs.delete(1))

/**
 * 模拟并集运算
 * 创建一个函数，来返回包含 setA 和 setB 中所有的元素的新集合
 * 迭代这两个集合，把所有元素都添加到并集的集合中
 * @param {*} setA 集合A
 * @param {*} setB 集合B
 */
const union = (setA, setB) => {
  const unionAB = new Set()
  setA.forEach(value => unionAB.add(value))
  setB.forEach(value => unionAB.add(value))
  return unionAB
}

union(set, setEs)

const difference = (setA, setB) => {
  const differenceSet = new Set()
  setA.forEach(value => {
    if (!setB.has(value)) {
      differenceSet.add(value)
    }
  })
  return differenceSet
}

difference(set, setEs)

/**
 * 有一种计算并集，交集和差集的简便方法，就是使用 扩展运算符
 * 1. 将集合转化为数组
 * 2. 执行需要的运算
 * 3. 将结果转化回集合
 */

const setA = new Set()
const setB = new Set()

/**
 * 用扩展运算符进行并集的运算
 */
console.log(new Set([...setA, ...setB]))

/**
 * 用扩展运算符进行交集的运算
 */
console.log(new Set([...setA].filter(x => setB.has(x))))

/**
 * 用扩展运算符完成差集的运算
 */
console.log(new Set([...setA].filter(x => !setB.has(x))))

/**
 * 在数学中，有一个叫做多重集的概念，它允许我们向集合中插入之前已经添加过的元素
 * 多重集(或袋)在计算集合中元素的出现次数时很有用
 */
