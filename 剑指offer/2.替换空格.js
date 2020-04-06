/*
 * @Author: Lambda
 * @Begin: 2020-04-06 15:23:21
 * @Update: 2020-04-06 15:26:45
 * @Update log: 更新日志
 */

/**
 * 替换空格
 * 请实现一个函数，把字符串中的每个空格替换成 '%20'。
 * 例如输入 We are happy
 * 输出 We%20are%20happy
 * @param {String} str 需要转换的字符串
 */
function replaceSpace (str) {
  return str.replace(/\s/g, '%20')
}

console.log('replaceSpace("We are happy"): ', replaceSpace('We are happy'))
