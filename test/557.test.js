/*
 * @Author: Lambda
 * @Begin: 2020-02-17 10:19:50
 * @Update: 2020-02-17 10:26:13
 * @Update log: 更新日志
 */
import reverseWords from '../code/557.反转字符串中的单词-iii.js'

const str = "Let's take LeetCode contest"
const str1 = "s'teL ekat edoCteeL tsetnoc"

test("reverse words:Let's take LeetCode contest", () => {
  expect(reverseWords(str)).toBe(str1)
})
