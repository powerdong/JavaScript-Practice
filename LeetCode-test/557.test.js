/*
 * @Author: Lambda
 * @Begin: 2020-02-18 09:51:40
 * @Update: 2020-02-18 09:51:40
 * @Update log: 更新日志
 */
import reverseWords from '../LeetCode-code/557.反转字符串中的单词-iii.js'

const str = "Let's take LeetCode contest"
const str1 = "s'teL ekat edoCteeL tsetnoc"

test("reverse words:Let's take LeetCode contest", () => {
  expect(reverseWords(str)).toBe(str1)
})
