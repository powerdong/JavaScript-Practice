/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let sum     = 0
  let head    = {}
  let cur     = head

  while(l1 || l2 || sum) {
      sum    += (l1 && l1.val) + (l2 && l2.val)
      cur     = cur.next = new ListNode(sum % 10)

      l1      = l1 && l1.next
      l2      = l2 && l2.next
      sum     = Math.floor(sum / 10)
  }
  return head.next
};
// @lc code=end

