---
outline: deep
---

# Cartographic 转经纬度

## Position 类的方法 - cartographic2axis

### 方法介绍

UniCore 内置 Position 类，提供 cartographic2axis 方法用于将弧度转经纬度的工具类方法。

该方法需传入 cartographic 弧度变量。

### 代码示例

```js
let axis = uniCore.position.cartographic2axis(cartographic);
console.log(axis);
```
