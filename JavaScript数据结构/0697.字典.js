/*
 * @Author: Lambda
 * @Begin: 2020-04-12 10:47:19
 * @Update: 2020-04-12 14:15:58
 * @Update log: 更新日志
 */

/**
 * 使用字典和散列表来存储唯一值(不重复值)的数据结构
 * 在字典(或映射)中，我们用[键，值]对的形式来存储数据
 * 在散列表中也是一样(也是以[键，值]对的形式来存储数据)
 * !: 字典中每个键只能有一个值
 */

/**
 * 集合表示一组互不相同的元素(不重复的元素)。在字典中，存储的是[键，值]对，其中键名是用来查询特定元素的。
 * 字典和集合很相似，集合以[值，值]的形式存储元素，字典则是以[键，值]的形式来存储元素。
 * TODO: 字典也称作 映射、符号表、或关联数组
 * 字典经常用来保存对象的引用地址
 */

const { defaultToString } = require('./utils/utils')

/**
 * 保存值
 */
class ValuePair {
  constructor (key, value) {
    this.key = key
    this.value = value
  }
  // 值的形式为 [key: value] 为了字典能够更简单的通过 toString 方法输出结果
  toString () {
    return `[${this.key}: ${this.value}]`
  }
}

class Dictionary {
  // 在字典中，理想的情况是用字符串作为键名，值可以是任何类型(从数、字符串等原始类型，到复杂的对象)
  // 但是由于 JavaScript 不是强类型的语言，我们不能保证键一定是字符串，我们需要把所有作为键名传入的对象转换为字符串
  constructor (toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    // 我们将在一个 Object 的实例而不是数组中存储字典中的元素
    // 我们会将 [键，值]对保存 table[key] = {key, value}
    this.table = {}
  }
  /**
   * 向字典中添加新元素。
   * 如果 key 已经存在，那么已存在的 value 会被新的值覆盖
   * @param {String} key 键
   * @param {Number} value 值
   * @returns {Boolean}
   */
  set (key, value) {
    if (key != null && value != null) {
      // 如果 key 和 value 不是 undefined 或 null，那么我们获取表示 key 的字符串
      const tableKey = this.toStrFn(key)
      this.table[tableKey] = new ValuePair(key, value)
      return true
    }
    return false
  }
  /**
   * 通过使用键值作为参数来从字典中移除键值对应的数据值
   * @param {String} key 键
   * @returns {Boolean}
   */
  remove (key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)]
      return true
    }
    return false
  }
  /**
   * 如果某个键值存在于该字典中，返回 true，否则返回 false
   * @param {String} key 键
   * @returns {Boolean}
   */
  hasKey (key) {
    // 如果传入一个复杂对象最为键，需要将它转化为一个字符串。
    // 如果已经存在一个给定键名的键值对(表中的位置不是 null 或 undefined)，那么返回 true，否则返回 false
    return this.table[this.toStrFn(key)] != null
  }
  /**
   * 通过以键值作为参数查找特定的数值并返回
   * @param {*} key 键
   * @returns {Number}
   */
  get (key) {
    // 首先会检索存储在给定 key 属性中的对象
    const valuePair = this.table[this.toStrFn(key)]
    // 如果 valuePair 对象存在，将返回该值，否则将返回一个 undefined
    return valuePair == null ? undefined : valuePair.value
  }
  /**
   * 删除该字典中所有值
   */
  clear () {
    this.table = {}
  }
  /**
   * 返回字典所包含的所有键名以数组形式返回
   * @returns {Array}
   */
  size () {
    // 使用 Object.keys 方法来获取 table 对象中的所有键名
    return Object.keys(this.table).length
  }
  /**
   * 在 size 等于零的时候返回 true，否则返回 false
   * @returns {Boolean}
   */
  isEmpty () {
    return this.size() === 0
  }
  /**
   * 将字典所包含的所有数值以数组形式返回
   * @returns {Array}
   */
  keys () {
    const keys = []
    const valuePairs = this.keyValues()
    for (let i = 0; i < valuePairs.length; i++) {
      keys.push(valuePairs[i].key)
    }
    return keys
  }
  /**
   * 将字典所包含的所有数值以数组形式返回
   * @returns {Array}
   */
  values () {
    // values 方法返回一个字典包含的所有值构成的数组。它的代码和 keys 方法很相似，只不过不同于返回 ValuePair 类的 key 属性，我们返回的是 value 属性
    return this.keyValues().map(valuePair => valuePair.value)
  }
  /**
   * 将字典中所有 [键，值]对 返回
   * @returns {Array}
   */
  keyValues () {
    const valuePairs = []
    // 迭代了 table 对象的所有属性
    for (const k in this.table) {
      // 为了保证 key 是存在的，我们会使用 hasKey 函数来进行校验，因为对象的原型也会包含对象的其他属性
      if (this.hasKey(k)) {
        // 然后将 table 对象中的 valuePair 加入结果数组
        valuePairs.push(this.table[k])
      }
    }
    return valuePairs
  }
  /**
   * 迭代字典中所有的键值对
   * @param {Function} callbackFn 回调函数
   * callbackFn 有两个参数：key 和 value，该方法可以在回调函数中返回 false 时被终止 (和 Array 类的 every 方法类似)
   */
  forEach (callbackFn) {
    // 首先我们获取字典中所有 valuePair 构成的数组
    const valuePairs = this.keyValues()
    // 然后我们迭代每个 valuePair
    for (let i = 0; i < valuePairs.length; i++) {
      // 执行以参数形式传入 forEach 方法的 callbackFn 函数，保存它的结果
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value)
      // 如果回调函数返回了 false 我们会终端 forEach 方法的执行，打断正在迭代的 for 循环
      if (result === false) {
        break
      }
    }
  }
  toString () {
    if (this.isEmpty()) {
      // 如果字典为空，我们就返回一个空字符
      return ''
    }
    const valuePairs = this.keyValues()
    // 将它的第一个 valuePair 加入结果字符串
    let objString = `${valuePairs[0].toString()}`
    // 如果数组中还有值，执行同样的方法加入结果字符串
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString},${valuePairs[i].toString()}`
    }
    return objString
  }
}

// 使用 Dictionary 类

const dictionary = new Dictionary()
dictionary.set('Gandalf', 'gandalf@email.com')
dictionary.set('John', 'john@email.com')
dictionary.set('Tyrian', 'tyrian@email.com')

console.log(dictionary.hasKey('Tyrian')) // true
console.log(dictionary.size()) // 3

console.log(dictionary.keys()) // [ 'Gandalf', 'John', 'Tyrian' ]
console.log(dictionary.values()) // [ 'gandalf@email.com', 'john@email.com', 'tyrian@email.com' ]
console.log(dictionary.get('Tyrian')) // tyrian@email.com

dictionary.remove('John')

console.log(dictionary.keys()) // [ 'Gandalf', 'Tyrian' ]
console.log(dictionary.values()) // [ 'gandalf@email.com', 'tyrian@email.com' ]
console.log(dictionary.keyValues()) // [ ValuePair { key: 'Gandalf', value: 'gandalf@email.com' },ValuePair { key: 'Tyrian', value: 'tyrian@email.com' } ]

dictionary.forEach((k, v) => {
  console.log(`forEach: key: ${k}, value: ${v}`)
})
// forEach: key: Gandalf, value: gandalf@email.com
// forEach: key: Tyrian, value: tyrian@email.com


module.exports = {
  Dictionary
}