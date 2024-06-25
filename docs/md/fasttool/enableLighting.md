---
outline: deep
---

# 全局光照设置

## 其他方法 - enableLighting

### 方法介绍

UniCore viewer 提供 enableLighting 方法用于设置全局光照。

### 代码示例

```js
uniCore.viewer.scene.globe.enableLighting = true;
```

### 拓展

你还可以结合 shadows 、light 设置阴影或进一步设置光照。如：

```js
viewer.shadows = true
viewer.scene.light = new Cesium.DirectionalLight({
  direction: new Cesium.Cartesian3(0.354925, -0.890918, -0.283358)
})
```