---
outline: deep
---

# 开启地下模式

## Model 类的方法 - undergroundMode

### 方法介绍

UniCore 内置 Model 类，提供 undergroundMode 方法用于开启地下模式，摄像机能够看到地下情况。

该方法需传入一个布尔值，用来控制开关地下模式。

变量的JSDoc形式如下：

```js
/**
 * 地下模式
 * @param {*} bool 是否开启地下模式
 */
```

不妨通过代码示例在 Vue 中尝试一下（相关模型文件在本章 [阅前提醒](./whatisit.md) 中的内网Git链接中可获取）：

### 在线尝试

可以使用章节 [快速开始(在线尝试)](../faststart.md#在线尝试) 中的链接，将下文的 `代码示例` 覆盖原代码进行在线尝试。

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

      // 切换地下模式
      uniCore.model.undergroundMode(true);
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
}
</style>


```

### 关键代码

你可以通过修改 undergroundMode 中的布尔值查看修改这些变量带来的效果。

```js
uniCore.model.undergroundMode(true);
```

### 拓展

你可以使用 viewer.scene.backgroundColor 控制地下模式的天空背景色，或使用 viewer.terrainProvider 开关地形，如下例子：

```js
viewer.scene.backgroundColor = Cesium.Color.fromCssColorString("#b9d3ee");
viewer.terrainProvider = null;
```