---
outline: deep
---

# 内置IndexedDB数据库

## DataBase 类的方法 - database

### 方法介绍

UniCore 内置 DataBase 类，提供 database 的 get 方法用于将模型等静态文件存储至内置 IndexedDB 数据库。

该方法需传入资源 URL 。

### 代码示例

```js
uniCore.database.get(modelUrl).then(blob => {
  const url = URL.createObjectURL(new Blob([blob]));
  // 在此处可直接调用 url 进行其他操作，如根据 url 加载模型等功能。
  ...
})
```
