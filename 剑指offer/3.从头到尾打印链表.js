/*
 * @Author: Lambda
 * @Begin: 2020-04-06 15:27:33
 * @Update: 2020-04-06 15:35:02
 * @Update log: 更新日志
 */

function Node (value) {
  this.value = value
  this.next = null
}

/**
 * 从头到尾打印链表
 * 输入一个链表的头结点，从尾到头反过来打印出每个节点的值
 * @param {Node} head
 */
function printListFromTailToHead (head) {
  const result = []
  let pNode = head
  while (pNode !== null) {
    result.unshift(pNode.value)
    pNode = pNode.next
  }
  return result
}

const a = new Node('a')
const b = new Node('b')
const c = new Node('c')
const d = new Node('d')

a.next = b
b.next = c
c.next = d

console.log('printListFromTailToHead(a): ', printListFromTailToHead(a))
