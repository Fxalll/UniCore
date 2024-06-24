---
outline: deep
---

# 经纬度转 Cartographic

## Position 类的方法 - axis2cartographic

### 方法介绍

UniCore 内置 Position 类，提供 axis2cartographic 方法用于将经纬度转弧度的工具类方法。

该方法需分别传入 lon, lat, height 变量（经度、维度、高程）。

### 代码示例

```js
let cartographic = uniCore.position.axis2cartographic(lon, lat, height);
console.log(cartographic);
```
