---
outline: deep
---

# 根据坐标创建一个图片标签

## Tip 类的方法 - createImgTip

### 方法介绍

UniCore 内置 Tip 类，提供 createImgTip 方法用于创建一个图片标签。

该方法需传入两个变量，即id值、标签内容。可选变量参见JSDoc形式如下：

```js
/**
 * 创建图片标签
 * @param {*} id id值
 * @param {*} url 图片url
 * @param {*} axis 坐标
 * @param {*} options 设置
 * @param {*} callback 点击回调函数
 */
```

不妨通过代码示例在 Vue 中尝试一下（相关模型文件在本章 [阅前提醒](./whatisit.md) 中的内网Git链接中可获取）：

### 在线尝试

可以使用章节 [快速开始(在线尝试)](../faststart.md#在线尝试) 中的链接，将下文的 `代码示例` 覆盖原代码进行在线尝试。

### 在线演示

点击 [在线链接](http://192.168.4.56:8091/?id=createImgTip) 以查看在线演示。

### 代码示例

```vue
<template>
  <div id="unicoreContainer"></div>
</template>

<script>
import { UniCore } from 'unicore-sdk'
import { config } from 'unicore-sdk/unicore.config'
import 'unicore-sdk/Widgets/widgets.css'
import * as Cesium from 'cesium'

export default {
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.init();
  },

  // 方法集合
  methods: {

    /**
    * 通用图形引擎初始化
    */
    init () {

      // 初始化UniCore

      // 目前采用Cesium的地形&底图数据，这里配置Cesium的token
      let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNjEwMzI4My01MjBmLTQzYzktOGZiMS0wMDRhZjE0N2IyMGIiLCJpZCI6MTc1NzkyLCJpYXQiOjE3MTM3NzQ3OTh9.zU-R4MNvHr8rvn1v28PQfDImyutnpPF2lmEgGeSPckQ";
      // 初始化unicore
      let uniCore = new UniCore(config, accessToken);
      uniCore.init("unicoreContainer");

      // 视角初始化
      uniCore.position.buildingPosition(uniCore.viewer, [113.12380548015745, 28.250758831850005, 700], -20, -45, 1);

      // 加入图片标签
      let options = {
        show: true, // default
        pixelOffset: new Cesium.Cartesian2(0, -50), // default: (0, 0)
        eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // default: CENTER
        scale: 2.0, // default: 1.0
        color: Cesium.Color.LIME, // default: WHITE
        rotation: Cesium.Math.PI_OVER_FOUR, // default: 0.0
        alignedAxis: Cesium.Cartesian3.ZERO, // default
        width: 100, // default: undefined
        height: 25, // default: undefined
        sizeInMeters: true, // 随缩放而缩放
      }
      uniCore.tip.createImgTip('图片标签', "../static/img/ui/shezhi.png", [113.12248820449636, 28.254850218457687, 100], options, () => { alert("你点击到了图片标签") })



    }

  }

}
</script>
<style scoped>
#unicoreContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: black;
}
</style>
```

### 示例运行结果

点击图片标签（options为空）

![Alt text](image-44.png)

点击图片标签（options如示例所设置）

![Alt text](image-45.png)


### 关键代码

你可以通过修改 createImgTip 中的变量查看修改这些变量带来的效果。

```js
let options = {
  show: true, // default
  pixelOffset: new Cesium.Cartesian2(0, -50), // default: (0, 0)
  eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
  horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
  verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // default: CENTER
  scale: 2.0, // default: 1.0
  color: Cesium.Color.LIME, // default: WHITE
  rotation: Cesium.Math.PI_OVER_FOUR, // default: 0.0
  alignedAxis: Cesium.Cartesian3.ZERO, // default
  width: 100, // default: undefined
  height: 25, // default: undefined
  sizeInMeters: true, // 随缩放而缩放
}
uniCore.tip.createImgTip('图片标签', "../static/img/ui/shezhi.png", [113.12248820449636, 28.254850218457687, 70], options, () => { alert("你点击到了图片标签") })
```

### 拓展

你可以在 `window.viewer.entities._entities._array` 中找到图片标签的 entities 。