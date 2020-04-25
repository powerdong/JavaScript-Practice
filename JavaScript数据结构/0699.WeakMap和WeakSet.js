/**
 * *： 基本上，Map 和 Set 与其弱化版本之间仅有的区别是：
 * *： 1. WeakSet 或 WeakMap 类没有 entries、keys 和 values 等方法
 * *： 2. 只能用对象作为键
 * 创建和使用这两个类主要是为了性能。WeakSet 和 WeakMap 是弱化的(用对象作为键)，没有强化引用的键
 * 另一个优点：必须用键才可以取出值。这些类没有 entries、keys 和 values 等迭代器
 */

const map = new WeakMap()

const obj1 = {
  name: 'Gandalf'
};
const obj2 = {
  name: 'John'
};
const obj3 = {
  name: 'Tyrian'
};

/**
 * WeakMap 类也可以用 set 方法，但不能使用数、字符串、布尔值等基本数据类型，需要将名字转换为对象。
 */
map.set(obj1, 'gandalf@email.com');
map.set(obj2, 'johnsnow@email.com');
map.set(obj3, 'tyrian@email.com')

console.log(map.has(obj1)); // true
console.log(map.get(obj3)); // tyrian@email.com
map.delete(obj2)

