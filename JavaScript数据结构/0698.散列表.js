/*
 * @Author: Lambda
 * @Begin: 2020-04-12 14:16:33
 * @Update: 2020-04-12 16:12:24
 * @Update log: 更新日志
 */

/**
 * 散列算法的作用是尽可能块地在数据结构中找到一个值
 * 如果要在数据结构中获得一个值(使用get方法)，需要迭代整个数据结构来找到它
 * 如果使用散列函数，就知道值的具体位置，因此能够快速检索到该值
 * 散列函数的作用是给定一个键值，然后返回值在表中的地址
 * 散列表可以用来保存键和对表中记录的引用。另一个很常见的应用是使用散列表来表示对象
 */

const { defaultToString } = require('./utils/utils')
const { LinkedList } = require('./0695.链表')
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

/**
 * 使用一个关联数组(对象)来表示我们的数据结构
 */
class HashTable {
  constructor (toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }
  /**
   * 向散列表增加一个新的项(也能更新散列表)
   * @param {String} key 键
   * @param {Number} value 值
   * @returns {Boolean}
   */
  put (key, value) {
    // 首先我们校验 key 和 value 是否合法
    if (key != null && value != null) {
      // 需要用所创建的 hashCode 函数在表中找到一个位置
      const position = this.hashCode(key)
      // 然后用 key 和 value 创建一个 ValuePair 实例
      this.table[position] = new ValuePair(key, value)
      return true
    }
    return false
  }
  /**
   * 根据键值从散列表中移除值
   * @param {String} key 键值
   * @returns {Boolean}
   */
  remove (key) {
    // 首先需要知道所在的位置，因此我们需要使用 hashCode 函数来获取 hash
    const hash = this.hashCode(key)
    // 我们在 hash 的位置获取到 valuePair
    const valuePair = this.table[hash]
    if (valuePair != null) {
      // 如果 valuePair 不是 null 或 undefined，就是用 JavaScript 的 delete 运算符将其删除
      delete this.table[hash]
      // 删除成功返回 true
      return true
    }
    return false
  }
  /**
   * 返回根据键值检索到的特定的值
   * @param {String} key
   * @returns {Number}
   */
  get (key) {
    // 使用 hashCode 方法获取 key 参数的位置，该函数会返回对应值的位置
    const valuePair = this.table[this.hashCode(key)]
    // 到 table 数组中知道对应的位置取到值并返回
    return valuePair == null ? undefined : valuePair.value
  }
  /**
   * 散列函数
   * @param {String} key 键值
   */
  loseLoseHashCode (key) {
    if (typeof key === 'number') {
      // 首先校验 key 是不是一个数
      return key
    }
    const tableKey = this.toStrFn(key)
    let hash = 0
    // 遍历 key 并将从 ASCII 表中查到的每个字符对应的 ASCII 值加到 hash 变量中
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i)
    }
    // 为了得到比较小的数值，我们会使用 hash 值和一个任意数做除法的余数，这可以规避操作数超过数值变量最大表示范围的风险
    return hash % 37
  }
  hashCode (key) {
    return this.loseLoseHashCode(key)
  }
}

// 使用 HashTable
const hash = new HashTable()
hash.put('Gandalf', 'gandalf@email.com')
hash.put('John', 'john@email.com')
hash.put('Triton', 'triton@email.com')

console.log(hash.hashCode('Gandalf') + ' - Gandalf') // 19 - Gandalf
console.log(hash.hashCode('John') + ' - John') // 29 - John
console.log(hash.hashCode('Triton') + ' - Triton') // 11 - Triton

console.log(hash.get('Gandalf')) // gandalf@email.com
console.log(hash.get('Logans')) // undefined

hash.remove('John')
console.log(hash.get('John')) // undefined

/**
 * 还有一种叫做散列集合的实现
 * 散列集合由一个集合构成，但是插入、移除或获取元素，使用的是 hashCode 函数
 * TODO: 处理冲突有几种方法：分离链接、线性探查和双散列法
 */

/**
 * 分离链接
 * 分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面
 * 它是解决冲突的最简单的方法，但是在 HashTable 实例之外还需要额外的存储空间
 */

class HashTableSeparateChaining extends HashTable {
  constructor (toStrFn = defaultToString) {
    super()
    this.toStrFn = toStrFn
    this.table = {}
  }
  /**
   * 向散列表增加一个新的项
   * @param {String} key 键
   * @param {Number} value 值
   * @returns {Boolean}
   */
  put (key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key)
      // 我们将验证要加入新元素的位置是否已经被占据
      if (this.table[position] == null) {
        // 如果第一次向该位置加入元素，我们会在该位置上初始化一个 LinkedList 类的实例
        this.table[position] = new LinkedList()
      }
      this.table[position].push(new ValuePair(key, value))
      return true
    }
    return false
  }
  /**
   * 获取给定键的值
   * @param {String} key 键
   */
  get (key) {
    const position = this.hashCode(key)
    const linkedList = this.table[position]
    // 首先要验证的是在特定的位置上是否有元素存在，我们在 position 位置检索 linkedList，并检验是否存在 linkedList 实例
    if (linkedList != null && !linkedList.isEmpty()) {
      // 如果该位置上有值存在，我们知道这是一个 LinkedList 实例
      // 现在要做的就是迭代这个链表来寻找我们需要的元素
      // 在迭代之前先要获取链表表头的引用，然后就可以从链表的头部迭代到尾部
      let current = linkedList.getHead()
      while (current != null) {
        if (current.element.key === key) {
          return current.element.value
        }
        current = current.next
      }
    }
    return undefined
  }
  remove (key) {
    const position = this.hashCode(key)
    const linkedList = this.table[position]
    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead()
      while (current != null) {
        if (current.element.key === key) {
          linkedList.remove(current.element)
          if (linkedList.isEmpty()) {
            delete this.table[position]
          }
          return true
        }
        current = current.next
      }
    }
    return false
  }
}

/**
 * 线性探查
 * 之所以称作线性，是因为它处理冲突得方法是将元素直接存储到表中，而不是在单独的数据结构中
 * 
 * 线性探查技术分为两种，第一种是软删除方法。我们使用一个特殊的值(标记)来表示键值对被删除了(惰性删除或软删除)，而不是真的删除它。
 */

class LinearDeletion extends HashTable {
  constructor (toStrFn = defaultToString) {
    super()
    this.toStrFn = toStrFn
    this.table = {}
  }
  put (key, value) {
    if (key != null && value != null) {
      // 先获得由散列函数生成的位置
      const position = this.hashCode(key)
      // 然后验证这个位置是否有元素存在
      if (this.table[position] == null) {
        // 如果没有元素存在(这是最简单的场景)，就在这个位置添加新元素：一个ValuePair的实例
        this.table[position] = new ValuePair(key, value)
      } else {
        // 如果该位置已经被占据，需要找到下一个没有被占据的位置(position 的值是 undefined 或 null)，因此我们声明一个 index 变量并赋值为 position + 1
        let index = position + 1
        // 然后验证该位置是否被占据，如果被占据，继续将 index 递增，直到找到一个没有被占据的位置
        while (this.table[index] != null) {
          index++
        }
        // 然后我们要做的就是将值分配到该位置
        this.table[index] = new ValuePair(key, value)
      }
      return true
    }
    return false
  }
  get  (key) {
    const position = this.hashCode(key)
    // 要获得一个键对应的值，先要确定这个键的存在
    if (this.table[position] != null) {
      // 如果这个键存在，需要检查我们要找的值是否就是原始位置上的值
      if (this.table[position].key === key) {
        // 如果是，就返回这个值
        return this.table[position].value
      }
      // 如果不是，就在下一个位置继续查找
      let index = position + 1
      // 我们按照位置递增的顺序查找散列表上的元素直到找到我们要找的元素，或者找到一个空位置
      while (this.table[index] != null && this.table[index].key !== key) {
        index++
      }
      // 当从 while 循环跳出的时候，我们要验证元素的键是否是我们要找的键
      if (this.table[index] != null && this.table[index].key === key) {
        // 如果是，就返回它的值
        return this.table[position].value
      }
      // 如果迭代完整个散列表，并且 index 的位置上是 undefined 或 null 的话，说明要找的键不存在，返回 undefined
    }
    // 如果这个键不存在，说明要查找的值不在散列表中，因此可以返回 undefined
    return undefined
  }
  remove (key) {
    const position = this.hashCode(key)
    if (this.table[position] != null) {
      delete this.table[position]
      // 由于我们不知道在散列表的不同位置上是否存在具有相同 hash 的元素，需要验证删除操作是否有副作用
      // 如果有，就需要将冲突的元素移动至一个之前的位置，这样就不会产生空位置
      this.verifyRemoveSideEffect(key, position)
      return true
    }
    let index = position
    while (this.table[index] != null && this.table[index].key !== key) {
      index++
    }
    if (this.table[index] != null && this.table[index].key === key) {
      delete this.table[index]
      this.verifyRemoveSideEffect(key, index)
      return true
    }
    return false
  }
  /**
   * 接受两个参数
   * @param {String} key 被删除的 key
   * @param {Number} removedPosition 该 key 被删除的位置
   */
  verifyRemoveSideEffect (key, removedPosition) {
    // 首先我们要获取被删除的 key 的 hash 值
    const hash = this.hashCode(key)
    let index = removedPosition + 1
    // 然后，我们从下一个位置开始迭代散列表，直到找到一个空位置
    while (this.table[index] != null) {
      // 当空位置被找到后，表示元素都在合适的位置上，不需要进行移动
      const posHash = this.hashCode(this.table[index].key)
      if (posHash <= hash || posHash <= removedPosition) {
        // 如果当前元素的 hash 值小于或等于原始 hash 值或者当前元素的 hash 值小于或等于 removedPosition 的位置
        this.table[removedPosition] = this.table[index]
        // 移动完成后，我们可以删除当前的元素
        delete this.table[index]
        removedPosition = index
      }
      index++
    }
  }
}

// =======================================================
/**
 * ES6 新增了 Map 类，可以基于 ES6 的 Map 类开发我们的 Dictionary 类
 */

const map = new Map()

map.set('Gandalf', 'gandalf@email.com')
map.set('John', 'john@email.com')
map.set('Torino', 'torino@email.com')

console.log(map.has('Gandalf')) // true
console.log(map.size); // 3
console.log(map.keys()); // MapIterator { 'Gandalf', 'John', 'Torino' }
console.log(map.values()); // MapIterator { 'gandalf@email.com', 'john@email.com', 'torino@email.com' }
console.log(map.get('Gandalf')); // gandalf@email.com

// 删除 map 中的元素可以用 delete 方法
map.delete('John')




