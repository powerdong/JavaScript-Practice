/*
 * @Author: Lambda
 * @Begin: 2020-02-17 21:12:28
 * @Update: 2020-02-18 10:00:10
 * @Update log: 可以通过 node watchFile.js 运行该文件
 * 通过监听 code 文件夹的变化，当在 code 文件夹下创建题目文件时，
 * 会在test文件夹下自动创建对应的 test 文件
 *
 * 557.反转字符串中的单词-iii.js ===> 557.test.js
 */
const fs = require('fs')
const path = require('path')

const codePath = path.join(__dirname, 'LeetCode-code')
const testPath = path.join(__dirname, 'LeetCode-test')

/**
 * 根据题目名称提取出题目序号
 * @param {*} filePath 创建的题目路径
 */
const getFileName = (filePath) => {
  const result = filePath.match(/(\d)+\./g)
  return result
}

/**
 * 检测是否有文件
 * @param {*} filename 文件路径
 */
const isInFile = (filename) => {
  fs.stat(filename, (_err, stat) => {
    if (_err) {
      console.log(`当前没${filename}文件`)
      addFile(filename)
      return false
    } else if (stat && stat.isFile()) {
      console.log(`当前有${filename}文件`)
      // delFile(filename)
      return true
    }
  })
}

/**
 * 添加test文件
 * @param {*} name 题目名称文件
 */
const addFileFn = (name) => {
  const _name = getFileName(name)
  const fileName = `${testPath}\\${_name}test.js`
  isInFile(fileName)
}

/**
 * 添加文件
 * @param {*} filename 文件名
 */
const addFile = (filename) => {
  fs.appendFile(filename, '', (err) => {
    if (err) throw err
    console.log(`已添加${filename}文件`)
  })
}

/**
 * 删除文件
 * @param {*} filename 文件名
 */
const delFile = (filename) => {
  fs.unlink(filename, (_err) => {
    if (_err) throw _err
    console.log('文件已删除')
  })
}

/**
 * 监听文件夹的变化
 */
fs.watch(codePath, function (event, filename) {
  if (filename) {
    addFileFn(filename)
  } else {
    console.log('filename not provided')
  }
})
