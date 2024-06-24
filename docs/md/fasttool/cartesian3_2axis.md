---
outline: deep
---

# Cartesian3 转经纬度

## Position 类的方法 - cartesian3_2axis

### 方法介绍

UniCore 内置 Position 类，提供 cartesian3_2axis 方法用于将 Cartesian3 转经纬度的工具类方法。

该方法需传入 Cartesian3 世界坐标变量。

### 代码示例

```js
let axis = uniCore.position.cartesian3_2axis(cartographic);
console.log(axis);
```
