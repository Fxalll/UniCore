---
outline: deep
---

# 经纬度转换为 Cartesian3

## Position 类的方法 - axis2cartesian3

### 方法介绍

UniCore 内置 Position 类，提供 axis2cartesian3 方法用于将经纬度转换为 Cartesian3 世界坐标的工具类方法。

该方法需分别传入 axis 变量（包含经度、维度、高程的数组）。

### 代码示例

```js
let cartesian3 = uniCore.position.axis2cartesian3([lon, lat, height]);
console.log(cartesian3);
```
