---
outline: deep
---

# 飞行定位到模型

## 其他方法 - zoomTo

### 方法介绍

UniCore viewer 提供 zoomTo 方法用于直接飞行定位到指定模型上。

### 代码示例

```js
let options = {
  id: '小别墅1号示例',
}
//加载3dtiles
uniCore.model.createTileset(options.url, options).then(cityLeft => {
  uniCore.model.changeModelPos(cityLeft, [113.12098820449636, 28.256150218457687, 130], [0, 0, 0], [23.8, 23.8, 23.8])

  uniCore.viewer.zoomTo(cityLeft)

})
```

### 关键代码

```js
uniCore.viewer.zoomTo(cityLeft)
```

### 拓展

UniCore viewer 提供的 flyTo 方法也能达到与 zoomTo 一致的效果。

```js
uniCore.viewer.flyTo(cityLeft)
```