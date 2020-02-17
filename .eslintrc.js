/*
 * @Author: Lambda
 * @Begin: 2020-02-16 17:57:09
 * @Update: 2020-02-17 10:07:56
 * @Update log: 更新日志
 */
module.exports = {
  root: true,
  extends: ["standard", "plugin:jest/recommended"],
  env: {
    node: true
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": [2, {
      "vars": "all",
      "args": "after-used"
    }], //不能有声明后未被使用的变量或参数
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};